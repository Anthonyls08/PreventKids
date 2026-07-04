package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.EjercicioPorDificultadDTO;
import upc.edu.pe.preventkids.dtos.RecommendedExerciseDTO;
import upc.edu.pe.preventkids.dtos.RecommendedExerciseInsertDTO;
import upc.edu.pe.preventkids.entities.RecommendedExercise;
import upc.edu.pe.preventkids.servicesinterfaces.IRecommendedExerciseService;

import java.time.LocalDate;
import java.util.ArrayList;
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
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
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

    @GetMapping("/{id}")
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
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
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

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
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
    public ResponseEntity<?> buscar(@RequestParam String nombre) {

        if (nombre == null || nombre.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de búsqueda no puede estar vacío");
        }

        if (nombre.length() < 3) {
            throw new IllegalArgumentException("Escribe al menos 3 caracteres para buscar");
        }

        ModelMapper m = new ModelMapper();
        List<RecommendedExerciseDTO> lista = reS.buscarPorNombre(nombre).stream()
                .map(y -> m.map(y, RecommendedExerciseDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }

    // GRAFICO: cantidad de ejercicios por dificultad
    @GetMapping("/conteo-por-dificultad")
    public ResponseEntity<?> contarPorDificultad() {
        List<Object[]> resultados = reS.contarPorDificultad();
        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay ejercicios recomendados registrados");
        }
        List<EjercicioPorDificultadDTO> respuesta = new ArrayList<>();
        for (Object[] fila : resultados) {
            EjercicioPorDificultadDTO dto = new EjercicioPorDificultadDTO();
            dto.setDificultad((String) fila[0]);
            dto.setCantidad(((Number) fila[1]).intValue());
            respuesta.add(dto);
        }
        return ResponseEntity.ok(respuesta);
    }

    // FILTRO (decision): ejercicios con duracion mayor o igual al minimo indicado
    @GetMapping("/decidir-por-duracion")
    public ResponseEntity<?> decidirPorDuracion(@RequestParam int duracionMinima) {
        if (duracionMinima <= 0) {
            return ResponseEntity.badRequest().body("Error: La duracion minima debe ser mayor a 0.");
        }
        ModelMapper m = new ModelMapper();
        List<RecommendedExerciseDTO> lista = reS.decidirPorDuracion(duracionMinima).stream()
                .map(y -> m.map(y, RecommendedExerciseDTO.class))
                .collect(Collectors.toList());
        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(lista);
    }

}
