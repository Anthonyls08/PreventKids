package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.ProfessionalProfile;

import java.util.List;
import java.util.Optional;

public interface IProfessionalProfileService {
    public List<ProfessionalProfile> list();
    public ProfessionalProfile insert(ProfessionalProfile p);
    public Optional<ProfessionalProfile> listId(int id);
    public void update(ProfessionalProfile p);
    public void delete(int id);
}
