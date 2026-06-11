package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.Specialty;
import upc.edu.pe.preventkids.repositories.ISpecialtyRepository;
import upc.edu.pe.preventkids.servicesinterfaces.ISpecialtyService;

import java.util.List;
import java.util.Optional;
@Service
public class SpecialtyServiceImplement implements ISpecialtyService {
    @Autowired
    private ISpecialtyRepository sR;

    @Override
    public List<Specialty> list() {
        return sR.findAll();
    }

    @Override
    public Specialty insert(Specialty s) {
        return sR.save(s);
    }

    @Override
    public Optional<Specialty> listId(int id) {
        return sR.findById(id);
    }

    @Override
    public void update(Specialty s) {
        sR.save(s);
    }

    @Override
    public void delete(int id) {
        sR.deleteById(id);
    }

    @Override
    public List<Specialty> buscarPorArea(String area) {
        return sR.findByArea(area);
    }

    @Override
    public List<Specialty> buscarPorAtencionVirtual(boolean virtual) {
        return sR.buscarPorAtencionVirtual(virtual);
    }
}
