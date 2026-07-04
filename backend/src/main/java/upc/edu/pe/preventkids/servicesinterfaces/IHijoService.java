package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.Hijo;

import java.util.List;
import java.util.Optional;

public interface IHijoService {
    public List<Hijo> list();
    public Hijo insert(Hijo h);
    public Optional<Hijo> listId(int id);
    public void update(Hijo h);
    public void delete(int id);
    // Hijos del padre autenticado (por el email del token)
    public List<Hijo> listarPorPadre(String email);
}
