package upc.edu.pe.preventkids.servicesinterfaces;

import org.springframework.beans.factory.BeanRegistry;
import upc.edu.pe.preventkids.entities.Specialty;

import java.util.List;
import java.util.Optional;

public interface ISpecialtyService {
    public List<Specialty> list();
    public Specialty insert(Specialty s);
    public Optional<Specialty> listId(int id);
    public void update(Specialty s);
    public void delete(int id);
    public List<Specialty> buscarPorArea(String area);
    public List<Specialty> buscarPorAtencionVirtual(boolean virtual);
}
