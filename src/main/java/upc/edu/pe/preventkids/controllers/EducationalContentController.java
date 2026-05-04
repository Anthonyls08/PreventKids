package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.EducationalContentDTO;
import upc.edu.pe.preventkids.dtos.EducationalContentInsertDTO;
import upc.edu.pe.preventkids.entities.educationalContent;
import upc.edu.pe.preventkids.servicesinterfaces.IEducationalContentService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class EducationalContentController {
    @Autowired
    private IEducationalContentService eS;

    @GetMapping
    public ResponseEntity<List<EducationalContentDTO>> listarEC(){
        ModelMapper m = new ModelMapper();
        List<EducationalContentDTO> listaEC = eS.list().stream()
                .map(y->m.map(y, EducationalContentDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaEC);

    }
    @PostMapping("/registrarEC")
    public ResponseEntity<?> registrar(@RequestBody EducationalContentInsertDTO dto){
        ModelMapper m = new ModelMapper();
        educationalContent e = m.map(dto, educationalContent.class);
        educationalContent eduContent = eS.insert(e);
        EducationalContentInsertDTO responseDTO = m.map(eduContent, EducationalContentInsertDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/idEC")
    public ResponseEntity<?> buscarPorId(@PathVariable int id){
        ModelMapper m = new ModelMapper();
        Optional<educationalContent> eduContent = eS.listId(id);

        if (eduContent.isPresent()){
            EducationalContentInsertDTO dto = m.map(eduContent.get(), EducationalContentInsertDTO.class);
            return  ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No encontrado");
        }
    }

    @PutMapping("/actualizarEC")
    public ResponseEntity<String> actualizar(@RequestBody EducationalContentInsertDTO dto) {

        Optional<educationalContent> existente = null;
        try {
            existente = eS.listId(dto.getIdEducationalContent());
            if (existente.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No encontrado");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        educationalContent e = existente.get();

        e.setTittleEducationalContent(dto.getTittleEducationalContent());
        e.setDescriptionEC(dto.getDescriptionEC());
        e.setUrlContent(dto.getUrlContent());
        e.setTypeEC(dto.getTypeEC());

        eS.update(e);

        return ResponseEntity.ok("Actualizado correctamente");
    }
    @DeleteMapping("/{deleteEC}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<educationalContent> eduContent = eS.listId(id);

        if (eduContent.isPresent()) {
            eS.delete(id);
            return ResponseEntity.ok("Eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No encontrado");
        }
    }

    @GetMapping("/buscartipo")
    public List<educationalContent> buscar(@RequestParam String tipo) {

        // Validación 1: No nulo o vacío
        if (tipo == null || tipo.trim().isEmpty()) {
            throw new IllegalArgumentException("El tipo de contenido es obligatorio.");
        }

        // Validación 2: Longitud mínima (evita búsquedas demasiado genéricas)
        if (tipo.length() < 3) {
            throw new IllegalArgumentException("El tipo debe tener al menos 3 caracteres.");
        }

        return eS.buscarPorTipo(tipo);
    }
}
