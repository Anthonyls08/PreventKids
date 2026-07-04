package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.ChatPreguntaDTO;
import upc.edu.pe.preventkids.dtos.ChatRespuestaDTO;
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
    public ResponseEntity<List<chatIAInsertDTO>> listar(){
        ModelMapper m=new ModelMapper();
        List<chatIAInsertDTO> listaChat=cS.list().stream()
                .map(y->m.map(y,chatIAInsertDTO.class))
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
    // Flujo del asistente: 1) busca una pregunta parecida ya respondida (cache),
    // 2) si no hay, llama a la API de Gemini, 3) si la API falla, mensaje de respaldo
    @PostMapping("/preguntar")
    public ResponseEntity<?> preguntar(@RequestBody ChatPreguntaDTO dto) {
        if (dto.getPregunta() == null || dto.getPregunta().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("La pregunta no puede estar vacía");
        }
        String pregunta = dto.getPregunta().trim();
        if (pregunta.length() > 300) {
            return ResponseEntity.badRequest().body("La pregunta no puede superar los 300 caracteres");
        }

        ChatRespuestaDTO respuesta = new ChatRespuestaDTO();
        respuesta.setPregunta(pregunta);

        // 1. Cache: pregunta similar ya respondida (similitud de Jaccard)
        Optional<chatIA> similar = cS.buscarSimilar(pregunta);
        if (similar.isPresent()) {
            respuesta.setIdchatIA(similar.get().getIdchatIA());
            respuesta.setRespuesta(similar.get().getRespuesta());
            respuesta.setDesdeCache(true);
            return ResponseEntity.ok(respuesta);
        }

        // 2. API de Gemini (guarda la nueva pregunta y respuesta en la tabla)
        chatIA nuevo = cS.preguntarIA(pregunta);
        if (nuevo == null) {
            // 3. Respaldo: sin API key, sin internet o limite agotado
            respuesta.setRespuesta("El asistente no está disponible en este momento. " +
                    "Te recomendamos consultar con un especialista desde el módulo de videollamada.");
            respuesta.setDesdeCache(false);
            return ResponseEntity.ok(respuesta);
        }
        respuesta.setIdchatIA(nuevo.getIdchatIA());
        respuesta.setRespuesta(nuevo.getRespuesta());
        respuesta.setDesdeCache(false);
        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
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
