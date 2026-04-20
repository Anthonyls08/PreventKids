package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.MedicionDTO;
import upc.edu.pe.preventkids.dtos.MedicionInsertDTO;
import upc.edu.pe.preventkids.entities.Medicion;
import upc.edu.pe.preventkids.servicesinterfaces.IMedicionService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/medicion")
public class MedicionController {
    @Autowired
    private IMedicionService mS;

    @GetMapping
    public ResponseEntity<List<MedicionDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<MedicionDTO> lista = mS.list().stream()
                .map(y -> m.map(y, MedicionDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody MedicionInsertDTO dto) {
        ModelMapper m = new ModelMapper();
        Medicion medicion = m.map(dto, Medicion.class);

        Medicion nuevaMedicion = mS.insert(medicion);

        MedicionDTO responseDTO = m.map(nuevaMedicion, MedicionDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<Medicion> medicion = mS.listId(id);

        if (medicion.isPresent()) {
            MedicionDTO dto = m.map(medicion.get(), MedicionDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Medición no encontrada");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable int id, @RequestBody MedicionInsertDTO dto) {
        Optional<Medicion> existente = mS.listId(id);

        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Medición no encontrada");
        }

        Medicion m = existente.get();

        m.setPesoKg(dto.getPesoKg());
        m.setTallaCm(dto.getTallaCm());
        m.setImc(dto.getImc());
        m.setClasificacion_imc(dto.getClasificacion_imc());
        m.setPresion(dto.getPresion());
        m.setTemperatura(dto.getTemperatura());
        m.setFecha_medicion(dto.getFecha_medicion());

        mS.update(m);
        return ResponseEntity.ok("Medición actualizada correctamente");
    }

    // 5. ELIMINAR (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<Medicion> medicion = mS.listId(id);

        if (medicion.isPresent()) {
            mS.delete(id);
            return ResponseEntity.ok("Medición eliminada correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: Medición no encontrada");
        }
    }
}
