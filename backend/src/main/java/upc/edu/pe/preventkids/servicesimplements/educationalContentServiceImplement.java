package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.educationalContent;
import upc.edu.pe.preventkids.repositories.IEducationalContentRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IEducationalContentService;

import java.util.List;
import java.util.Optional;

@Service
public class educationalContentServiceImplement implements IEducationalContentService {
    @Autowired
    private IEducationalContentRepository eR;

    @Override
    public List<educationalContent> list() {return eR.findAll();}

    @Override
    public educationalContent insert(educationalContent e) {return eR.save(e);}

    @Override
    public Optional<educationalContent> listId(int id) {return eR.findById(id);}

    @Override
    public void update(educationalContent e) {eR.save(e);}

    @Override
    public void delete(int id) {eR.deleteById(id);}

    @Override
    public List<educationalContent> buscarPorTipo(String tipo) {
        return eR.buscarPorTipo(tipo);
    }
}
