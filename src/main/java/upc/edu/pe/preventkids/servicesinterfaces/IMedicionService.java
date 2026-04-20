package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.Medicion;

import java.util.List;
import java.util.Optional;

public interface IMedicionService {
    public List<Medicion> list();
    public Medicion insert(Medicion m);
    public Optional<Medicion> listId(int id);
    public void update(Medicion m);
    public void delete(int id);
    //List<Medicion> buscarNivelService(int nivel); -// FK para la tabla de Dali
}
