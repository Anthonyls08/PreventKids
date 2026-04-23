package upc.edu.pe.preventkids.servicesinterfaces;


import upc.edu.pe.preventkids.entities.RecommendedExercise;

import java.util.List;
import java.util.Optional;

public interface IRecommendedExerciseService{
    public List<RecommendedExercise> list();
    public RecommendedExercise insert(RecommendedExercise re);
    public Optional<RecommendedExercise> listId(int id);
    public void update(RecommendedExercise re);
    public void delete(int id);


}
