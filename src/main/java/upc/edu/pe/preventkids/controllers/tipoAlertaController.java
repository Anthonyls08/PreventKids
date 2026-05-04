package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.tipoAlertaDTO;
import upc.edu.pe.preventkids.dtos.tipoAlertaInsertDTO;
import upc.edu.pe.preventkids.entities.TipoAlerta;
import upc.edu.pe.preventkids.servicesinterfaces.ITipoalertaService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tipos-alerta")
public class tipoAlertaController {
    @Autowired
    private ITipoalertaService tS;
    @GetMapping("/listar")
    public ResponseEntity<List<tipoAlertaDTO>> listar(){
        ModelMapper m=new ModelMapper();
        List<tipoAlertaDTO> listatipo=tS.list().stream()
                .map(y->m.map(y,tipoAlertaDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listatipo);
    }
    @PostMapping("/insertar")
    public ResponseEntity<?> registrar(@RequestBody tipoAlertaInsertDTO dto){
        if (dto.getNivelriesgo() < 1 || dto.getNivelriesgo() > 5) {
            return ResponseEntity.badRequest()
                    .body("Error: El nivel de riesgo debe estar entre 1 y 5.");
        }
        ModelMapper m=new ModelMapper();
        TipoAlerta a=m.map(dto, TipoAlerta.class);
        TipoAlerta tipoAlerta= tS.insert(a);
        tipoAlertaInsertDTO responseDTO=m.map(tipoAlerta,tipoAlertaInsertDTO.class);
        return  ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<TipoAlerta> tipoAlerta = tS.listId(id);

        if (tipoAlerta.isPresent()) {
            tipoAlertaInsertDTO dto = m.map(tipoAlerta.get(), tipoAlertaInsertDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Tipo de alerta no encontrada");
        }
    }
    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizar(@RequestBody tipoAlertaInsertDTO dto) {
        if (dto.getNivelriesgo() < 1 || dto.getNivelriesgo() > 5) {
            return ResponseEntity.badRequest()
                    .body("Error: El nivel de riesgo debe estar entre 1 y 5.");
        }
        Optional<TipoAlerta> existente = tS.listId(dto.getIdTipoalerta());
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Tipo de alerta no encontrada");
        }

        TipoAlerta t = existente.get();

        t.setNombre(dto.getNombre());
        t.setNivelriesgo(dto.getNivelriesgo());
        t.setDescripcion(dto.getDescripcion());
        t.setAtencionprof(dto.isAtencionprof());
        t.setMensaje(dto.getMensaje());

        tS.update(t);

        return ResponseEntity.ok("Tipo de alerta actualizada correctamente");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<TipoAlerta> tipoAlerta = tS.listId(id);

        if (tipoAlerta.isPresent()) {
            tS.delete(id);
            return ResponseEntity.ok("Tipo de alerta eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Tipo de alerta no encontrado");
        }
    }

    @GetMapping("/filtrar-por-nivelriesgo")
    public ResponseEntity<?> filtrarAlertas(@RequestParam(required = false, defaultValue = "1") Integer nivelRiesgo,@RequestParam(required = false, defaultValue = "false") Boolean requiereAtencion) {

        if (nivelRiesgo < 1 || nivelRiesgo > 5) {
            return ResponseEntity.badRequest()
                    .body("Error: El nivel de riesgo debe estar entre 1 y 5.");
        }

        ModelMapper m = new ModelMapper();
        List<tipoAlertaDTO> listaFiltrada = tS.filtrar(nivelRiesgo, requiereAtencion)
                .stream()
                .map(y -> m.map(y, tipoAlertaDTO.class))
                .collect(Collectors.toList());

        if (listaFiltrada.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(listaFiltrada);
    }
}
