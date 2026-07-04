package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.Hijo;
import upc.edu.pe.preventkids.repositories.IHijoRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IHijoService;

import java.util.List;
import java.util.Optional;

@Service
public class HijoServiceImplement implements IHijoService {
    @Autowired
    private IHijoRepository hR;

    @Override
    public List<Hijo> list() {return hR.findAll();}

    @Override
    public Hijo insert(Hijo h) {return hR.save(h);}

    @Override
    public Optional<Hijo> listId(int id) {return hR.findById(id);}

    @Override
    public void update(Hijo h) {hR.save(h);}

    @Override
    public void delete(int id) {hR.deleteById(id);}

    @Override
    public List<Hijo> listarPorPadre(String email) {return hR.findByUser_Email(email);}
}
