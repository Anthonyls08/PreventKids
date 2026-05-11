package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.ProfessionalProfileDTO;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;
import upc.edu.pe.preventkids.entities.Specialty;
import upc.edu.pe.preventkids.entities.User;
import upc.edu.pe.preventkids.repositories.ISpecialtyRepository;
import upc.edu.pe.preventkids.repositories.IUserRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IProfessionalProfileService;

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

    private ModelMapper createPPMapper() {
        ModelMapper m = new ModelMapper();
        m.typeMap(ProfessionalProfile.class, ProfessionalProfileDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUser().getIdUser(), ProfessionalProfileDTO::setIdUser);
            mapper.map(src -> src.getSpecialty().getIdSpecialty(), ProfessionalProfileDTO::setIdSpecialty);
        });
        return m;
    }

    @GetMapping
    public ResponseEntity<List<ProfessionalProfileDTO>> listar() {
        ModelMapper m = createPPMapper();
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

        ModelMapper m = createPPMapper();
        ProfessionalProfile pp = m.map(dto, ProfessionalProfile.class);
        pp.setUser(user);
        pp.setSpecialty(specialty);
        ProfessionalProfile profile = pS.insert(pp);
        ProfessionalProfileDTO responseDTO = m.map(profile, ProfessionalProfileDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = createPPMapper();
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
