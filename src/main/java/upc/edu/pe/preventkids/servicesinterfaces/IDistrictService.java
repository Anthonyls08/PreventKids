package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.District;

import java.util.List;
import java.util.Optional;

public interface IDistrictService {
    public List<District> list();
    public District insert(District d);
    public Optional<District> listId(int id);
    public void update(District d);
    public void delete(int id);
    public List<District> buscarPorNombre(String nombre);
}
