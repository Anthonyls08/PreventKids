package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.RecommendedExerciseDTO;
import upc.edu.pe.preventkids.dtos.RecommendedExerciseInsertDTO;
import upc.edu.pe.preventkids.entities.RecommendedExercise;
import upc.edu.pe.preventkids.servicesinterfaces.IRecommendedExerciseService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/EjercicioRecomendado")
public class RecommendedExerciseController {
    @Autowired
    private IRecommendedExerciseService reS;
    @GetMapping
    public ResponseEntity<List<RecommendedExerciseDTO>> listar(){
        ModelMapper m=new ModelMapper();
        List<RecommendedExerciseDTO> listaEjercicios=reS.list().stream()
                .map(y->m.map(y,RecommendedExerciseDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaEjercicios);
    }
    @PostMapping("/registrarEjercicioRecomendado")
    public ResponseEntity<?> registrar(@RequestBody RecommendedExerciseInsertDTO dto){

        if (dto.getDateRecommendedExercise() == null ) {
            return ResponseEntity.badRequest()
                    .body("Las fecha no pueden ser nulas");
        }
        if (!dto.getDateRecommendedExercise().isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest()
                    .body("La fecha debe ser anterior a la actual");
        }
        ModelMapper m=new ModelMapper();
        RecommendedExercise a=m.map(dto, RecommendedExercise.class);
        RecommendedExercise autor= reS.insert(a);
        RecommendedExerciseInsertDTO responseDTO=m.map(autor,RecommendedExerciseInsertDTO.class);
        return  ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{buscarEjercicioRecomendado}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<RecommendedExercise> autor = reS.listId(id);

        if (autor.isPresent()) {
            RecommendedExerciseInsertDTO dto = m.map(autor.get(), RecommendedExerciseInsertDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Ejercicio no encontrado");
        }
    }


    @PutMapping("/actualizaEjercicioRecomendado")
    public ResponseEntity<String> actualizar(@RequestBody RecommendedExerciseInsertDTO dto) {

        Optional<RecommendedExercise> existente = null;
        try {
            existente = reS.listId(dto.getIdRecommendedExercise());
            if (existente.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Ejercicio no encontrado");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        if (dto.getDateRecommendedExercise() == null ) {
            return ResponseEntity.badRequest()
                    .body("Las fecha no pueden ser nulas");
        }
        if (!dto.getDateRecommendedExercise().isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest()
                    .body("La fecha debe ser anterior a la actual");
        }

        RecommendedExercise re = existente.get();

        re.setNameRecommendedExercise(dto.getNameRecommendedExercise());
        re.setDescriptionReExercise(dto.getDescriptionReExercise());
        re.setDifficultRecommendedExercise(dto.getDifficultRecommendedExercise());
        re.setDurationRecommendedExercise(dto.getDurationRecommendedExercise());
        re.setDateRecommendedExercise(dto.getDateRecommendedExercise());

        reS.update(re);

        return ResponseEntity.ok("Ejercicio actualizado correctamente");
    }

    @DeleteMapping("/{deleteEjercicio}")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<RecommendedExercise> ejercicioR = reS.listId(id);

        if (ejercicioR.isPresent()) {
            reS.delete(id);
            return ResponseEntity.ok("Ejercicio eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Ejercicio no encontrado");
        }
    }

    @GetMapping("/buscarPorNombre")
    public List<RecommendedExercise> buscar(@RequestParam String nombre) {

        if (nombre == null || nombre.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de búsqueda no puede estar vacío");
        }

        if (nombre.length() < 3) {
            throw new IllegalArgumentException("Escribe al menos 3 caracteres para buscar");
        }

        return reS.buscarPorNombre(nombre);
    }



}
