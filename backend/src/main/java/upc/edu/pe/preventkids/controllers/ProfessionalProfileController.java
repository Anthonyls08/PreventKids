package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.ProfessionalProfileDTO;
import upc.edu.pe.preventkids.dtos.ProfileSpecialtyCountDTO;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;
import upc.edu.pe.preventkids.entities.Specialty;
import upc.edu.pe.preventkids.entities.User;
import upc.edu.pe.preventkids.repositories.ISpecialtyRepository;
import upc.edu.pe.preventkids.repositories.IUserRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IProfessionalProfileService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/professionalprofiles")
public class ProfessionalProfileController {

    @Autowired
    private IProfessionalProfileService pS;
    @Autowired
    private IUserRepository uR;
    @Autowired
    private ISpecialtyRepository sR;

    @GetMapping
    public ResponseEntity<List<ProfessionalProfileDTO>> listar() {
        List<ProfessionalProfileDTO> lista = pS.list().stream()
                .map(y -> {
                    ModelMapper m = new ModelMapper();
                    m.getConfiguration().setAmbiguityIgnored(true);
                    ProfessionalProfileDTO dto = m.map(y, ProfessionalProfileDTO.class);
                    dto.setIdUser(y.getUser().getIdUser());
                    dto.setIdSpecialty(y.getSpecialty().getIdSpecialty());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @PostMapping("/web")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> registrar(@RequestBody ProfessionalProfileDTO dto) {
        if (dto.getNumerocolegiatura() == null || dto.getNumerocolegiatura().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("El número de colegiatura no puede ser nulo");
        }
        if (dto.getIdUser() == 0) {
            return ResponseEntity.badRequest()
                    .body("El perfil debe estar asociado a un usuario");
        }
        if (dto.getIdSpecialty() == 0) {
            return ResponseEntity.badRequest()
                    .body("La especialidad no puede ser nula");
        }

        User user = uR.findById(dto.getIdUser())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + dto.getIdUser()));
        Specialty specialty = sR.findById(dto.getIdSpecialty())
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada con id: " + dto.getIdSpecialty()));

        ModelMapper m = new ModelMapper();
        m.getConfiguration().setAmbiguityIgnored(true);
        ProfessionalProfile pp = m.map(dto, ProfessionalProfile.class);
        pp.setUser(user);
        pp.setSpecialty(specialty);
        ProfessionalProfile profile = pS.insert(pp);

        ProfessionalProfileDTO responseDTO = m.map(profile, ProfessionalProfileDTO.class);
        responseDTO.setIdUser(profile.getUser().getIdUser());
        responseDTO.setIdSpecialty(profile.getSpecialty().getIdSpecialty());
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        Optional<ProfessionalProfile> profile = pS.listId(id);

        if (profile.isPresent()) {
            ModelMapper m = new ModelMapper();
            m.getConfiguration().setAmbiguityIgnored(true);
            ProfessionalProfileDTO dto = m.map(profile.get(), ProfessionalProfileDTO.class);
            dto.setIdUser(profile.get().getUser().getIdUser());
            dto.setIdSpecialty(profile.get().getSpecialty().getIdSpecialty());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Perfil profesional no encontrado");
        }
    }

    @PutMapping("/actualiza")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizar(@RequestBody ProfessionalProfileDTO dto) {
        Optional<ProfessionalProfile> existente = pS.listId(dto.getIdProfessionalProfile());

        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Perfil profesional no encontrado");
        }

        if (dto.getNumerocolegiatura() == null || dto.getNumerocolegiatura().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("El número de colegiatura no puede ser nulo");
        }

        User user = uR.findById(dto.getIdUser())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + dto.getIdUser()));
        Specialty specialty = sR.findById(dto.getIdSpecialty())
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada con id: " + dto.getIdSpecialty()));

        ProfessionalProfile pp = existente.get();
        pp.setNumerocolegiatura(dto.getNumerocolegiatura());
        pp.setInstitucion(dto.getInstitucion());
        pp.setUser(user);
        pp.setSpecialty(specialty);

        pS.update(pp);

        return ResponseEntity.ok("Perfil profesional actualizado correctamente");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<ProfessionalProfile> profile = pS.listId(id);

        if (profile.isPresent()) {
            pS.delete(id);
            return ResponseEntity.ok("Perfil profesional eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Perfil profesional no encontrado");
        }
    }

    @GetMapping("/conteo-por-especialidad")
    public ResponseEntity<?> contarPerfilesPorEspecialidad() {
        List<Object[]> resultados = pS.contarPerfilesPorEspecialidad();
        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay especialidades registradas");
        }
        List<ProfileSpecialtyCountDTO> respuesta = new ArrayList<>();
        for (Object[] fila : resultados) {
            ProfileSpecialtyCountDTO dto = new ProfileSpecialtyCountDTO();
            dto.setNombreEspecialidad((String) fila[0]);
            dto.setCantidadPerfiles(((Number) fila[1]).intValue());
            respuesta.add(dto);
        }
        return ResponseEntity.ok(respuesta);
    }
}
