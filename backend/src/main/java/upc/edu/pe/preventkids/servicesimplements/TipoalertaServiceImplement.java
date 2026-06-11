package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.TipoAlerta;
import upc.edu.pe.preventkids.repositories.ITipoAlertaRepository;
import upc.edu.pe.preventkids.servicesinterfaces.ITipoalertaService;

import java.util.List;
import java.util.Optional;

@Service
public class TipoalertaServiceImplement implements ITipoalertaService {
    @Autowired
    private ITipoAlertaRepository tR;

    @Override
    public List<TipoAlerta> list() { return tR.findAll(); }

    @Override
    public TipoAlerta insert(TipoAlerta t) {return tR.save(t);}

    @Override
    public Optional<TipoAlerta> listId(int id) {return tR.findById(id);}

    @Override
    public void update(TipoAlerta t) {tR.save(t);}

    @Override
    public void delete(int id) {tR.deleteById(id);}

    @Override
    public List<TipoAlerta> filtrar(int nivelRiesgo, boolean requiereAtencion) {
        return tR.filtrarPorRiesgoYAtencion(nivelRiesgo, requiereAtencion);
    }


}
