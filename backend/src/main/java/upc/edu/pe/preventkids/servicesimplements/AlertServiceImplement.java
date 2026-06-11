package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.Alert;
import upc.edu.pe.preventkids.repositories.IAlertRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IAlertService;

import java.util.List;
import java.util.Optional;

@Service
public class AlertServiceImplement implements IAlertService {
    @Autowired
    private IAlertRepository aR;

    @Override
    public List<Alert> list() {
        return aR.findAll();
    }

    @Override
    public Alert insert(Alert a) {
        return aR.save(a);
    }

    @Override
    public Optional<Alert> listId(int id) {
        return aR.findById(id);
    }

    @Override
    public void update(Alert a) {
        aR.save(a);
    }

    @Override
    public void delete(int id) {
        aR.deleteById(id);
    }

    @Override
    public List<Alert> obtenerAlertasNoLeidasCriticas(int umbralRiesgo) {
        return aR.obtenerAlertasNoLeidasCriticas(umbralRiesgo);
    }
}
