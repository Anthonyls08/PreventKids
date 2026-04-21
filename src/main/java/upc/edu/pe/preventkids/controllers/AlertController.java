package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.AlertDTO;
import upc.edu.pe.preventkids.entities.Alert;
import upc.edu.pe.preventkids.servicesinterfaces.IAlertService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alerta")
public class AlertController {
    @Autowired
    private IAlertService aS;
    @GetMapping("/listar")
    public ResponseEntity<List<AlertDTO>> listar(){
        ModelMapper m=new ModelMapper();
        List<AlertDTO> listaAlert=aS.list().stream()
                .map(y->m.map(y,AlertDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaAlert);
    }
    @PostMapping("/ingresar")
    public ResponseEntity<?> registrar(@RequestBody AlertDTO dto){
        ModelMapper m=new ModelMapper();
        Alert c=m.map(dto, Alert.class);
        Alert alerta= aS.insert(c);
        AlertDTO responseDTO=m.map(alerta,AlertDTO.class);
        return  ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<Alert> alerta = aS.listId(id);

        if (alerta.isPresent()) {
            AlertDTO dto = m.map(alerta.get(), AlertDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alerta no encontrado");
        }
    }
    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizar(@RequestBody AlertDTO dto) {

        Optional<Alert> existente = aS.listId(dto.getIdAlert());
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alerta no encontrado");
        }

        Alert a = existente.get();

        a.setLeida(dto.isLeida());
        a.setGenerationdate(dto.getGenerationdate());
        a.setTipoalert(dto.getTipoalert());
        a.setMedicion(dto.getMedicion());

        aS.update(a);
        return ResponseEntity.ok("Alerta actualizado correctamente");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<Alert> alerta = aS.listId(id);

        if (alerta.isPresent()) {
            aS.delete(id);
            return ResponseEntity.ok("Alerta eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alerta no encontrado");
        }
    }
}
