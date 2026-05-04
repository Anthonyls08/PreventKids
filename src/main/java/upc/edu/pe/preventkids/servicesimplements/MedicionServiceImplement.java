package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.Medicion;
import upc.edu.pe.preventkids.repositories.IMedicionRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IMedicionService;

import java.util.List;
import java.util.Optional;

@Service
public class MedicionServiceImplement implements IMedicionService {

    @Autowired
    private IMedicionRepository medicionRepository;

    @Override
    public List<Medicion> list() { return medicionRepository.findAll(); }

    @Override
    public Medicion insert(Medicion mR) {return medicionRepository.save(mR);}

    @Override
    public Optional<Medicion> listId(int id) {return medicionRepository.findById(id);}

    @Override
    public void update(Medicion mR) {medicionRepository.save(mR);}

    @Override
    public void delete(int id) {medicionRepository.deleteById(id);}

    @Override
    public List<Medicion> decidirAtencionPrioritaria(float imcMinimo) { return medicionRepository.decidirAtencionPrioritaria(imcMinimo); }
}
