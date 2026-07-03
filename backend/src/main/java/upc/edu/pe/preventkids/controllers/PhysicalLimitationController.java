package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.LimitacionPorCategoriaDTO;
import upc.edu.pe.preventkids.dtos.PhysicalLimitationDTO;
import upc.edu.pe.preventkids.dtos.PhysicalLimitationInsertDTO;
import upc.edu.pe.preventkids.entities.PhysicalLimitation;
import upc.edu.pe.preventkids.servicesinterfaces.IPhysicalLimitationService;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/LimitacionFisica")
public class PhysicalLimitationController {
    @Autowired
    private IPhysicalLimitationService phS;
    @GetMapping
    public ResponseEntity<List<PhysicalLimitationDTO>> listar(){
        ModelMapper m=new ModelMapper();
        List<PhysicalLimitationDTO> listaLimitaciones=phS.list().stream()
                .map(y->m.map(y,PhysicalLimitationDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaLimitaciones);
    }

    @PostMapping("/web")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> registrar(@RequestBody PhysicalLimitationInsertDTO dto){
        ModelMapper m=new ModelMapper();
        PhysicalLimitation p=m.map(dto, PhysicalLimitation.class);
        PhysicalLimitation limitacion=phS.insert(p);
        PhysicalLimitationInsertDTO responseDTO=m.map(limitacion,PhysicalLimitationInsertDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id){
        ModelMapper m = new ModelMapper();
        Optional<PhysicalLimitation> limitacion = phS.listId(id);

        if (limitacion.isPresent()){
            PhysicalLimitationInsertDTO dto = m.map(limitacion.get(), PhysicalLimitationInsertDTO.class);
            return ResponseEntity.ok(dto);
        }else {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Limitacion Fisica no encontrada");
        }
    }

    @PutMapping("/actualiza")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizar(@RequestBody PhysicalLimitationInsertDTO dto){

        Optional<PhysicalLimitation> existente = phS.listId(dto.getIdPhysicalLimitation());
        if (existente.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Limitacion no encontrada");
        }

        PhysicalLimitation p = existente.get();
        p.setNameLimitation(dto.getNameLimitation());
        p.setDescriptionLimitation(dto.getDescriptionLimitation());
        p.setCategoryLimitation(dto.getCategoryLimitation());
        p.setIntensityLimitation(dto.getIntensityLimitation());
        p.setProhibitedExercises(dto.getProhibitedExercises());

        phS.update(p);

        return ResponseEntity.ok("Limitacion Fisica actualziada correctamente");
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable int id){
        Optional<PhysicalLimitation> limitacion = phS.listId(id);

        if (limitacion.isPresent()){
            phS.delete(id);
            return ResponseEntity.ok("Limitacion Fisica eliminada correctamente");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Limitacion Fisica no encontrada");
        }
    }

    @GetMapping("/filtrarcategoria")
    public List<PhysicalLimitation> filtrar(@RequestParam String categoria) {

    
        if (categoria == null || categoria.trim().isEmpty()) {
            throw new IllegalArgumentException("La categoría es obligatoria para filtrar.");
        }

        if (categoria.length() > 20) {
            throw new IllegalArgumentException("La categoría es demasiado larga.");
        }

        return phS.buscarPorCategoria(categoria);
    }

    // GRAFICO: cantidad de limitaciones por categoria
    @GetMapping("/conteo-por-categoria")
    public ResponseEntity<?> contarPorCategoria() {
        List<Object[]> resultados = phS.contarPorCategoria();
        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay limitaciones fisicas registradas");
        }
        List<LimitacionPorCategoriaDTO> respuesta = new ArrayList<>();
        for (Object[] fila : resultados) {
            LimitacionPorCategoriaDTO dto = new LimitacionPorCategoriaDTO();
            dto.setCategoria((String) fila[0]);
            dto.setCantidad(((Number) fila[1]).intValue());
            respuesta.add(dto);
        }
        return ResponseEntity.ok(respuesta);
    }

    // FILTRO: limitaciones por intensidad
    @GetMapping("/filtrar-por-intensidad")
    public ResponseEntity<?> filtrarPorIntensidad(@RequestParam String intensidad) {
        if (intensidad == null || intensidad.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: La intensidad no puede estar vacia.");
        }
        ModelMapper m = new ModelMapper();
        List<PhysicalLimitationDTO> lista = phS.filtrarPorIntensidad(intensidad).stream()
                .map(y -> m.map(y, PhysicalLimitationDTO.class))
                .collect(Collectors.toList());
        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(lista);
    }
}
