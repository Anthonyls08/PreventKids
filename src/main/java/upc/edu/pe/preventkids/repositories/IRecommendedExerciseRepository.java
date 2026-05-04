package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.RecommendedExercise;

@Repository
public interface IRecommendedExerciseRepository extends JpaRepository<RecommendedExercise, Integer> {
}
