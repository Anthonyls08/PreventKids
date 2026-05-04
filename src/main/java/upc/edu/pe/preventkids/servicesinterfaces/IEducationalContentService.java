package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.educationalContent;

import java.util.List;
import java.util.Optional;

public interface IEducationalContentService {
    public List<educationalContent> list();
    public educationalContent insert(educationalContent e);
    public Optional<educationalContent> listId(int id);
    public void update(educationalContent e);
    public void delete(int id);
}
