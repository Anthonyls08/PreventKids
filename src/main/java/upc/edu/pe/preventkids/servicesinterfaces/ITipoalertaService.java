package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.TipoAlerta;

import java.util.List;
import java.util.Optional;

public interface ITipoalertaService {
    public List<TipoAlerta> list();
    public TipoAlerta insert(TipoAlerta t);
    public Optional<TipoAlerta> listId(int id);
    public void update(TipoAlerta t);
    public void delete(int id);
    public List<TipoAlerta> filtrar(int nivelRiesgo, boolean requiereAtencion);
}
