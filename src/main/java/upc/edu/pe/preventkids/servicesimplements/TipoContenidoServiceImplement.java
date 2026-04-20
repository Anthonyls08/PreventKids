package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.TipoContenido;
import upc.edu.pe.preventkids.repositories.ITipoContenidoRepository;
import upc.edu.pe.preventkids.servicesinterfaces.ITipoContenidoService;

import java.util.List;
import java.util.Optional;

@Service
public class TipoContenidoServiceImplement implements ITipoContenidoService {
    @Autowired
    private ITipoContenidoRepository tcR;

    @Override
    public List<TipoContenido> list() { return tcR.findAll(); }

    @Override
    public TipoContenido insert(TipoContenido tC) {return tcR.save(tC);}

    @Override
    public Optional<TipoContenido> listId(int id) {return tcR.findById(id);}

    @Override
    public void update(TipoContenido tC) {tcR.save(tC);}

    @Override
    public void delete(int id) {tcR.deleteById(id);}
}
