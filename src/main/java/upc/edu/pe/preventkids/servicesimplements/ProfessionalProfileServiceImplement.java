package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;
import upc.edu.pe.preventkids.repositories.IProfessionalProfileRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IProfessionalProfileService;

import java.util.List;
import java.util.Optional;
@Service
public class ProfessionalProfileServiceImplement implements IProfessionalProfileService {
    @Autowired
    private IProfessionalProfileRepository ppR;

    @Override
    public List<ProfessionalProfile> list() {
        return ppR.findAll();
    }

    @Override
    public ProfessionalProfile insert(ProfessionalProfile p) {
        return ppR.save(p);
    }

    @Override
    public Optional<ProfessionalProfile> listId(int id) {
        return ppR.findById(id);
    }

    @Override
    public void update(ProfessionalProfile p) {
        ppR.save(p);
    }

    @Override
    public void delete(int id) {
        ppR.deleteById(id);
    }
}
