package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.TipoContenido;

import java.util.List;
import java.util.Optional;

public interface ITipoContenidoService {
    public List<TipoContenido> list();
    public TipoContenido insert(TipoContenido tc);
    public Optional<TipoContenido> listId(int id);
    public void update(TipoContenido tc);
    public void delete(int id);
    public List<TipoContenido> decidirContenidoRapido(int duracionMax, String categoria);
}
