package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.VirtualConsultationDTO;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;
import upc.edu.pe.preventkids.entities.User;
import upc.edu.pe.preventkids.entities.VirtualConsultation;
import upc.edu.pe.preventkids.repositories.IProfessionalProfileRepository;
import upc.edu.pe.preventkids.repositories.IUserRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IVirtualConsultationService;

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

    @GetMapping
    public ResponseEntity<List<VirtualConsultationDTO>> listar() {
        List<VirtualConsultationDTO> lista = vS.list().stream()
                .map(y -> {
                    ModelMapper m = new ModelMapper();
                    VirtualConsultationDTO dto = m.map(y, VirtualConsultationDTO.class);
                    dto.setIdUser(y.getUser().getIdUser());
                    dto.setIdProfessionalProfile(y.getProfessionalprofile().getIdProfessionalProfile());
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }

    @PostMapping("/web")
    public ResponseEntity<?> registrar(@RequestBody VirtualConsultationDTO dto) {
        if (dto.getFechacita() == null) {
            return ResponseEntity.badRequest()
                    .body("La fecha de la cita no puede ser nula");
        }
        if (dto.getUrlsala() == null || dto.getUrlsala().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("La URL de la sala es obligatoria");
        }
        if (dto.getIdUser() == 0 || dto.getIdProfessionalProfile() == 0) {
            return ResponseEntity.badRequest()
                    .body("La consulta debe tener un usuario y un perfil profesional asociados");
        }

        User user = uR.findById(dto.getIdUser())
                .orElseThrow(() -> new RuntimeException("User no encontrado con id: " + dto.getIdUser()));
        ProfessionalProfile pp = ppR.findById(dto.getIdProfessionalProfile())
                .orElseThrow(() -> new RuntimeException("ProfessionalProfile no encontrado con id: " + dto.getIdProfessionalProfile()));

        ModelMapper m = new ModelMapper();
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
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        Optional<VirtualConsultation> consulta = vS.listId(id);
        if (consulta.isPresent()) {
            ModelMapper m = new ModelMapper();
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
    public ResponseEntity<String> actualizar(@RequestBody VirtualConsultationDTO dto) {
        Optional<VirtualConsultation> existente = vS.listId(dto.getIdVirtualConsultation());
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Consulta virtual no encontrada");
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
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<VirtualConsultation> consulta = vS.listId(id);
        if (consulta.isPresent()) {
            vS.delete(id);
            return ResponseEntity.ok("Consulta virtual eliminada correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Consulta virtual no encontrada");
        }
    }

    @GetMapping("/decidir-prioridad")
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
}
