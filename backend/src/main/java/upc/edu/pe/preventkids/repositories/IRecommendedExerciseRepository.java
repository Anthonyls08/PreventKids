package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.RecommendedExercise;

import java.util.List;

@Repository
public interface IRecommendedExerciseRepository extends JpaRepository<RecommendedExercise, Integer> {
    @Query("SELECT r FROM RecommendedExercise r WHERE r.nameRecommendedExercise LIKE %:nombre%")
    List<RecommendedExercise> buscarPorNombre(@Param("nombre") String nombre);

    // GRAFICO: cantidad de ejercicios agrupados por dificultad
    @Query("SELECT r.difficultRecommendedExercise, COUNT(r) FROM RecommendedExercise r GROUP BY r.difficultRecommendedExercise ORDER BY r.difficultRecommendedExercise")
    List<Object[]> contarPorDificultad();

    // FILTRO (decision): ejercicios cuya duracion es mayor o igual al minimo indicado
    @Query("SELECT r FROM RecommendedExercise r WHERE r.durationRecommendedExercise >= :duracionMinima")
    List<RecommendedExercise> decidirPorDuracion(@Param("duracionMinima") int duracionMinima);
}
