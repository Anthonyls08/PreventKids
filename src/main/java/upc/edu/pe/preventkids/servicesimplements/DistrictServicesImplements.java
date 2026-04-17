package upc.edu.pe.preventkids.servicesimplements;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.District;
import upc.edu.pe.preventkids.repositories.IDistrictRRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IDistrictService;

import java.util.List;
import java.util.Optional;

@Service
public class DistrictServicesImplements implements IDistrictService {
    @Autowired
    private IDistrictRRepository dR;

    @Override
    public List<District> list() {
        return dR.findAll();
    }

    @Override
    public District insert(District d) {
        return dR.save(d);
    }

    @Override
    public Optional<District> listId(int id) {
        return dR.findById(id);
    }

    @Override
    public void update(District d) { dR.save(d); }

    @Override
    public void delete(int id) { dR.deleteById(id); }
}