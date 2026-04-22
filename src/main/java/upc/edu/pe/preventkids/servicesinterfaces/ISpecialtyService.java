package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.Specialty;

import java.util.List;
import java.util.Optional;

public interface ISpecialtyService {
    public List<Specialty> list();
    public Specialty insert(Specialty s);
    public Optional<Specialty> listId(int id);
    public void update(Specialty s);
    public void delete(int id);
}
