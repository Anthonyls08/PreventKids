package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.RecommendedExercise;
import upc.edu.pe.preventkids.repositories.IRecommendedExerciseRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IRecommendedExerciseService;

import java.util.List;
import java.util.Optional;

@Service
public class RecommendedExerciseServiceImplement implements IRecommendedExerciseService {
    @Autowired
    private IRecommendedExerciseRepository reR;

    @Override
    public List<RecommendedExercise> list() {
        return reR.findAll();
    }

    @Override
    public RecommendedExercise insert(RecommendedExercise re) {
        return reR.save(re);
    }

    @Override
    public Optional<RecommendedExercise> listId(int id) {
        return reR.findById(id);
    }

    @Override
    public void update(RecommendedExercise re) {
        reR.save(re);
    }

    @Override
    public void delete(int id) {
        reR.deleteById(id);
    }
}
