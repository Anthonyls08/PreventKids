package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.chatIADTO;
import upc.edu.pe.preventkids.dtos.chatIAInsertDTO;
import upc.edu.pe.preventkids.entities.chatIA;
import upc.edu.pe.preventkids.servicesinterfaces.IChatIAService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chatIA")
public class chatIAController {
    @Autowired
    private IChatIAService cS;
    @GetMapping("/listar")
    public ResponseEntity<List<chatIADTO>> listar(){
        ModelMapper m=new ModelMapper();
        List<chatIADTO> listaChat=cS.list().stream()
                .map(y->m.map(y,chatIADTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaChat);
    }
    @PostMapping("/ingresar")
    public ResponseEntity<?> registrar(@RequestBody chatIAInsertDTO dto){
        ModelMapper m=new ModelMapper();
        chatIA c=m.map(dto, chatIA.class);
        chatIA chat= cS.insert(c);
        chatIAInsertDTO responseDTO=m.map(chat,chatIAInsertDTO.class);
        return  ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<chatIA> chat = cS.listId(id);

        if (chat.isPresent()) {
            chatIAInsertDTO dto = m.map(chat.get(), chatIAInsertDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Chat no encontrado");
        }
    }
    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizar(@RequestBody chatIAInsertDTO dto) {

        Optional<chatIA> existente = cS.listId(dto.getIdchatIA());
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Chat no encontrado");
        }

        chatIA a = existente.get();

        a.setPregunta(dto.getPregunta());
        a.setRespuesta(dto.getRespuesta());

        cS.update(a);
        return ResponseEntity.ok("Chat actualizado correctamente");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<chatIA> autor = cS.listId(id);

        if (autor.isPresent()) {
            cS.delete(id);
            return ResponseEntity.ok("Chat eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Chat no encontrado");
        }
    }

}
