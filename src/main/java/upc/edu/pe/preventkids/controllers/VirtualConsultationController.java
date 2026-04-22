package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.VirtualConsultationDTO;
import upc.edu.pe.preventkids.entities.VirtualConsultation;
import upc.edu.pe.preventkids.servicesinterfaces.IVirtualConsultationService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/virtualconsultations")
public class VirtualConsultationController {
    @Autowired
    private IVirtualConsultationService vS;

    @GetMapping
    public ResponseEntity<List<VirtualConsultationDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<VirtualConsultationDTO> lista = vS.list().stream()
                .map(y -> m.map(y, VirtualConsultationDTO.class))
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
        if (dto.getUser() == null || dto.getProfessionalprofile() == null) {
            return ResponseEntity.badRequest()
                    .body("La consulta debe tener un usuario y un perfil profesional asociados");
        }

        ModelMapper m = new ModelMapper();
        VirtualConsultation vc = m.map(dto, VirtualConsultation.class);
        VirtualConsultation virtualConsultation = vS.insert(vc);
        VirtualConsultationDTO responseDTO = m.map(virtualConsultation, VirtualConsultationDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<VirtualConsultation> consulta = vS.listId(id);

        if (consulta.isPresent()) {
            VirtualConsultationDTO dto = m.map(consulta.get(), VirtualConsultationDTO.class);
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
}
