package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.SpecialtyDTO;
import upc.edu.pe.preventkids.entities.Specialty;
import upc.edu.pe.preventkids.servicesinterfaces.ISpecialtyService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/specialties")
public class SpecialtyController {
    @Autowired
    private ISpecialtyService sS;

    @GetMapping
    public ResponseEntity<List<SpecialtyDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<SpecialtyDTO> lista = sS.list().stream()
                .map(y -> m.map(y, SpecialtyDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @PostMapping("/web")
    public ResponseEntity<?> registrar(@RequestBody SpecialtyDTO dto) {
        if (dto.getNombre() == null || dto.getNombre().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("El nombre de la especialidad no puede ser nulo");
        }
        if (dto.getArea() == null || dto.getArea().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("El área no puede ser nula");
        }

        ModelMapper m = new ModelMapper();
        Specialty s = m.map(dto, Specialty.class);
        Specialty specialty = sS.insert(s);
        SpecialtyDTO responseDTO = m.map(specialty, SpecialtyDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<Specialty> specialty = sS.listId(id);

        if (specialty.isPresent()) {
            SpecialtyDTO dto = m.map(specialty.get(), SpecialtyDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Especialidad no encontrada");
        }
    }

    @PutMapping("/actualiza")
    public ResponseEntity<String> actualizar(@RequestBody SpecialtyDTO dto) {
        Optional<Specialty> existente = sS.listId(dto.getIdSpecialty());

        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Especialidad no encontrada");
        }

        if (dto.getNombre() == null || dto.getNombre().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("El nombre no puede ser nulo");
        }

        ModelMapper m = new ModelMapper();
        Specialty s = existente.get();

        s.setNombre(dto.getNombre());
        s.setDescripcion(dto.getDescripcion());
        s.setArea(dto.getArea());
        s.setAtencionvirtual(dto.isAtencionvirtual());

        sS.update(s);

        return ResponseEntity.ok("Especialidad actualizada correctamente");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<Specialty> specialty = sS.listId(id);

        if (specialty.isPresent()) {
            sS.delete(id);
            return ResponseEntity.ok("Especialidad eliminada correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Especialidad no encontrada");
        }
    }

    @GetMapping("/buscar-area")
    public ResponseEntity<?> buscarPorArea(@RequestParam String area) {
        ModelMapper m = new ModelMapper();
        List<SpecialtyDTO> lista = sS.buscarPorArea(area).stream()
                .map(y -> m.map(y, SpecialtyDTO.class))
                .collect(Collectors.toList());
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron especialidades en el área: " + area);
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/buscar-atencion-virtual")
    public ResponseEntity<?> buscarPorAtencionVirtual(@RequestParam boolean virtual) {
        ModelMapper m = new ModelMapper();
        List<SpecialtyDTO> lista = sS.buscarPorAtencionVirtual(virtual).stream()
                .map(y -> m.map(y, SpecialtyDTO.class))
                .collect(Collectors.toList());
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron especialidades con atención virtual: " + virtual);
        }
        return ResponseEntity.ok(lista);
    }
}
