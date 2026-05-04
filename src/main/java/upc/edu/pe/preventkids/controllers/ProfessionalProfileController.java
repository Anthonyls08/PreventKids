package upc.edu.pe.preventkids.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.ProfessionalProfileDTO;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;
import upc.edu.pe.preventkids.servicesinterfaces.IProfessionalProfileService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/professionalprofiles")
public class ProfessionalProfileController {

    @Autowired
    private IProfessionalProfileService pS;

    @GetMapping
    public ResponseEntity<List<ProfessionalProfileDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<ProfessionalProfileDTO> lista = pS.list().stream()
                .map(y -> m.map(y, ProfessionalProfileDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @PostMapping("/web")
    public ResponseEntity<?> registrar(@RequestBody ProfessionalProfileDTO dto) {
        if (dto.getNumerocolegiatura() == null || dto.getNumerocolegiatura().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("El número de colegiatura no puede ser nulo");
        }
        if (dto.getUser() == null) {
            return ResponseEntity.badRequest()
                    .body("El perfil debe estar asociado a un usuario");
        }
        if (dto.getSpecialty() == null) {
            return ResponseEntity.badRequest()
                    .body("La especialidad no puede ser nula");
        }

        ModelMapper m = new ModelMapper();
        ProfessionalProfile pp = m.map(dto, ProfessionalProfile.class);
        ProfessionalProfile profile = pS.insert(pp);
        ProfessionalProfileDTO responseDTO = m.map(profile, ProfessionalProfileDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<ProfessionalProfile> profile = pS.listId(id);

        if (profile.isPresent()) {
            ProfessionalProfileDTO dto = m.map(profile.get(), ProfessionalProfileDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Perfil profesional no encontrado");
        }
    }

    @PutMapping("/actualiza")
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

        ModelMapper m = new ModelMapper();
        ProfessionalProfile pp = m.map(dto, ProfessionalProfile.class);
        pp.setIdProfessionalProfile(existente.get().getIdProfessionalProfile());

        pS.update(pp);

        return ResponseEntity.ok("Perfil profesional actualizado correctamente");
    }

    @DeleteMapping("/{id}")
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
}
