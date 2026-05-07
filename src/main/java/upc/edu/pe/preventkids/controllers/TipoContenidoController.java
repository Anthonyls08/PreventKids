package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.TipoContenidoDTO;
import upc.edu.pe.preventkids.dtos.TipoContenidoInsertDTO;
import upc.edu.pe.preventkids.entities.TipoContenido;
import upc.edu.pe.preventkids.servicesinterfaces.ITipoContenidoService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/tipos-contenido")
public class TipoContenidoController {
    @Autowired
    private ITipoContenidoService tcService;
    @GetMapping
    public ResponseEntity<List<TipoContenidoDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<TipoContenidoDTO> lista = tcService.list().stream()
                .map(y -> m.map(y, TipoContenidoDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @PostMapping("/insertar")
    public ResponseEntity<?> registrar(@RequestBody TipoContenidoInsertDTO dto){
        ModelMapper m=new ModelMapper();
        TipoContenido tC=m.map(dto, TipoContenido.class);
        TipoContenido tipoContenido= tcService.insert(tC);
        TipoContenidoInsertDTO responseDTO=m.map(tipoContenido,TipoContenidoInsertDTO.class);
        return  ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<TipoContenido> tipoContenido = tcService.listId(id);

        if (tipoContenido.isPresent()) {
            TipoContenidoDTO dto = m.map(tipoContenido.get(), TipoContenidoDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Tipo de contenido no encontrado");
        }
    }

    @PutMapping("/{actualizar}")
    public ResponseEntity<String> actualizar(@PathVariable int id, @RequestBody TipoContenidoInsertDTO dto) {
        Optional<TipoContenido> existente = tcService.listId(id);
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Tipo de contenido no encontrado");
        }
        TipoContenido t = existente.get();
        t.setNombre(dto.getNombre());
        t.setDescripcion(dto.getDescripcion());
        t.setDuracion(dto.getDuracion());
        tcService.update(t);
        return ResponseEntity.ok("Tipo de contenido actualizado correctamente");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {

        Optional<TipoContenido> tipoContenido = tcService.listId(id);
        if (tipoContenido.isPresent()) {
            tcService.delete(id);
            return ResponseEntity.ok("Tipo de contenido eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: Tipo de contenido no encontrado");
        }
    }

    @GetMapping("/decidir-contenido-rapido")
    public ResponseEntity<?> decidirContenido(@RequestParam int minutos, @RequestParam String categoria) {
        if (categoria == null || categoria.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: La categoría no puede estar vacía.");
        }
        if (minutos <= 0) {
            return ResponseEntity.badRequest().body("Error: Los minutos deben ser mayores a 0.");
        }
        ModelMapper m = new ModelMapper();
        List<TipoContenidoDTO> lista = tcService.decidirContenidoRapido(minutos, categoria)
                .stream()
                .map(y -> m.map(y, TipoContenidoDTO.class))
                .collect(Collectors.toList());
        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(lista);
    }
}
