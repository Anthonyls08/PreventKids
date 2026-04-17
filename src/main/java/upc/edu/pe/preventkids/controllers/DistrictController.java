package upc.edu.pe.preventkids.controllers;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.DistrictDTO;
import upc.edu.pe.preventkids.dtos.DistrictInsertDTO;
import upc.edu.pe.preventkids.entities.District;
import upc.edu.pe.preventkids.servicesinterfaces.IDistrictService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/distritos")
public class DistrictController {
    @Autowired
    private IDistrictService dS;

    @GetMapping
    public ResponseEntity<List<DistrictDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<DistrictDTO> listaDistritos = dS.list().stream()
                .map(y -> m.map(y, DistrictDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaDistritos);
    }

    @PostMapping("/web")
    public ResponseEntity<?> registrar(@RequestBody DistrictInsertDTO dto) {
        if (dto.getNameDistrict() == null || dto.getNameDistrict().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre del distrito no puede estar vacio");
        }
        if (dto.getNameDepartment() == null || dto.getNameDepartment().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre del departamento no puede estar vacio");
        }
        if (dto.getUbigeo() <= 0) {
            return ResponseEntity.badRequest().body("El codigo ubigeo debe ser mayor a 0");
        }
        ModelMapper m = new ModelMapper();
        District d = m.map(dto, District.class);
        District newDistrict = dS.insert(d);
        DistrictDTO responseDTO = m.map(newDistrict, DistrictDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<District> district = dS.listId(id);

        if (district.isPresent()) {
            DistrictDTO dto = m.map(district.get(), DistrictDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Distrito no encontrado");
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> actualizar(@PathVariable int id, @RequestBody DistrictInsertDTO dto) {

        Optional<District> existente = dS.listId(id);

        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Distrito no encontrado");
        }
        if (dto.getNameDistrict() == null || dto.getNameDistrict().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre del distrito es obligatorio");
        }

        District d = existente.get();

        d.setNameDistrict(dto.getNameDistrict());
        d.setNameDepartment(dto.getNameDepartment());
        d.setUbigeo(dto.getUbigeo());
        d.setZone(dto.getZone());

        dS.update(d);

        return ResponseEntity.ok("Distrito actualizado correctamente");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<District> distrito = dS.listId(id);

        if (distrito.isPresent()) {
            dS.delete(id);
            return ResponseEntity.ok("Distrito eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Distrito no encontrado");
        }
    }
}
