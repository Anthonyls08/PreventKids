package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.ConsultaPorEstadoDTO;
import upc.edu.pe.preventkids.dtos.VirtualConsultationDTO;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;
import upc.edu.pe.preventkids.entities.User;
import upc.edu.pe.preventkids.entities.VirtualConsultation;
import upc.edu.pe.preventkids.repositories.IProfessionalProfileRepository;
import upc.edu.pe.preventkids.repositories.IUserRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IVirtualConsultationService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/virtualconsultations")
public class VirtualConsultationController {

    @Autowired
    private IVirtualConsultationService vS;
    @Autowired
    private IUserRepository uR;
    @Autowired
    private IProfessionalProfileRepository ppR;

    // El PADRE solo ve SUS consultas; doctor y admin ven todas
    @GetMapping("/listar")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<List<VirtualConsultationDTO>> listar(Authentication auth) {
        List<VirtualConsultationDTO> lista = vS.list().stream()
                .filter(y -> !esPadre(auth) || esDuena(y.getUser(), auth))
                .map(y -> {
                    ModelMapper m = new ModelMapper();
                    m.getConfiguration().setAmbiguityIgnored(true);
                    VirtualConsultationDTO dto = m.map(y, VirtualConsultationDTO.class);
                    dto.setIdUser(y.getUser().getIdUser());
                    dto.setIdProfessionalProfile(y.getProfessionalprofile().getIdProfessionalProfile());
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }

    @PostMapping("/web")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> registrar(@RequestBody VirtualConsultationDTO dto, Authentication auth) {
        if (dto.getFechacita() == null) {
            return ResponseEntity.badRequest()
                    .body("La fecha de la cita no puede ser nula");
        }
        if (dto.getUrlsala() == null || dto.getUrlsala().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("La URL de la sala es obligatoria");
        }
        if (dto.getIdProfessionalProfile() == 0) {
            return ResponseEntity.badRequest()
                    .body("La consulta debe tener un perfil profesional asociado");
        }
        // El PADRE siempre agenda a su propio nombre (se ignora el idUser del body)
        if (esPadre(auth)) {
            User propio = uR.findByEmail(auth.getName());
            if (propio == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
            dto.setIdUser(propio.getIdUser());
        }
        if (dto.getIdUser() == 0) {
            return ResponseEntity.badRequest()
                    .body("La consulta debe tener un usuario asociado");
        }

        User user = uR.findById(dto.getIdUser())
                .orElseThrow(() -> new RuntimeException("User no encontrado con id: " + dto.getIdUser()));
        ProfessionalProfile pp = ppR.findById(dto.getIdProfessionalProfile())
                .orElseThrow(() -> new RuntimeException("ProfessionalProfile no encontrado con id: " + dto.getIdProfessionalProfile()));

        ModelMapper m = new ModelMapper();
        m.getConfiguration().setAmbiguityIgnored(true);
        VirtualConsultation vc = m.map(dto, VirtualConsultation.class);
        vc.setUser(user);
        vc.setProfessionalprofile(pp);
        VirtualConsultation virtualConsultation = vS.insert(vc);

        VirtualConsultationDTO responseDTO = m.map(virtualConsultation, VirtualConsultationDTO.class);
        responseDTO.setIdUser(virtualConsultation.getUser().getIdUser());
        responseDTO.setIdProfessionalProfile(virtualConsultation.getProfessionalprofile().getIdProfessionalProfile());
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> buscarPorId(@PathVariable int id, Authentication auth) {
        Optional<VirtualConsultation> consulta = vS.listId(id);
        if (consulta.isPresent()) {
            if (esPadre(auth) && !esDuena(consulta.get().getUser(), auth)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Solo puede ver sus propias consultas");
            }
            ModelMapper m = new ModelMapper();
            m.getConfiguration().setAmbiguityIgnored(true);
            VirtualConsultationDTO dto = m.map(consulta.get(), VirtualConsultationDTO.class);
            dto.setIdUser(consulta.get().getUser().getIdUser());
            dto.setIdProfessionalProfile(consulta.get().getProfessionalprofile().getIdProfessionalProfile());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Consulta virtual no encontrada");
        }
    }

    @PutMapping("/actualiza")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizar(@RequestBody VirtualConsultationDTO dto, Authentication auth) {
        Optional<VirtualConsultation> existente = vS.listId(dto.getIdVirtualConsultation());
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Consulta virtual no encontrada");
        }
        if (esPadre(auth) && !esDuena(existente.get().getUser(), auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Solo puede modificar sus propias consultas");
        }
        if (dto.getFechacita() == null) {
            return ResponseEntity.badRequest()
                    .body("La fecha no puede ser nula");
        }
        ModelMapper m = new ModelMapper();
        VirtualConsultation vc = m.map(dto, VirtualConsultation.class);
        vc.setIdVirtualConsultation(existente.get().getIdVirtualConsultation());
        vS.update(vc);
        return ResponseEntity.ok("Consulta virtual actualizada correctamente");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable int id, Authentication auth) {
        Optional<VirtualConsultation> consulta = vS.listId(id);
        if (consulta.isPresent()) {
            if (esPadre(auth) && !esDuena(consulta.get().getUser(), auth)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Solo puede eliminar sus propias consultas");
            }
            vS.delete(id);
            return ResponseEntity.ok("Consulta virtual eliminada correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Consulta virtual no encontrada");
        }
    }

    // Herramienta clinica de priorizacion: solo doctor y admin
    @GetMapping("/decidir-prioridad")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> decidirPrioridad(@RequestParam String estado, @RequestParam String nombrePaciente) {
        if (estado == null || estado.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: El estado de la consulta no puede estar vacío.");
        }
        if (nombrePaciente == null || nombrePaciente.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: El nombre del paciente no puede estar vacío.");
        }
        List<VirtualConsultationDTO> listaConsultas = vS.decidirPrioridadConsultaPaciente(estado, nombrePaciente)
                .stream()
                .map(y -> {
                    ModelMapper m = new ModelMapper();
                    m.getConfiguration().setAmbiguityIgnored(true);
                    VirtualConsultationDTO dto = m.map(y, VirtualConsultationDTO.class);
                    dto.setIdUser(y.getUser().getIdUser());
                    dto.setIdProfessionalProfile(y.getProfessionalprofile().getIdProfessionalProfile());
                    return dto;
                })
                .collect(Collectors.toList());
        if (listaConsultas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(listaConsultas);
    }

    // Reporte agregado: solo doctor y admin
    @GetMapping("/conteo-por-estado")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> contarPorEstado() {
        List<Object[]> resultados = vS.contarPorEstado();
        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay consultas virtuales registradas");
        }
        List<ConsultaPorEstadoDTO> respuesta = new ArrayList<>();
        for (Object[] fila : resultados) {
            ConsultaPorEstadoDTO dto = new ConsultaPorEstadoDTO();
            dto.setEstado((String) fila[0]);
            dto.setCantidad(((Number) fila[1]).intValue());
            respuesta.add(dto);
        }
        return ResponseEntity.ok(respuesta);
    }

    // El autenticado tiene rol PADRE (no ADMIN ni DOCTOR)
    private boolean esPadre(Authentication auth) {
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("PADRE"));
    }

    // La consulta pertenece al padre autenticado
    private boolean esDuena(User user, Authentication auth) {
        return user != null && auth.getName().equals(user.getEmail());
    }
}
