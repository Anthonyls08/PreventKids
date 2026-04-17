package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.PhysicalLimitation;
import upc.edu.pe.preventkids.repositories.IPhysicalLimitationRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IPhysicalLimitationService;

import java.util.List;
import java.util.Optional;

@Service
public class PhysicalLimitationImplement implements IPhysicalLimitationService {
    @Autowired
    private IPhysicalLimitationRepository phR;

    @Override
    public List<PhysicalLimitation> list() {return phR.findAll();}

    @Override
    public PhysicalLimitation insert(PhysicalLimitation p) {return phR.save(p);}

    @Override
    public Optional<PhysicalLimitation> listId(int id) {return phR.findById(id);}

    @Override
    public void update(PhysicalLimitation p) {phR.save(p);}

    @Override
    public void delete(int id) {phR.deleteById(id);}
}
