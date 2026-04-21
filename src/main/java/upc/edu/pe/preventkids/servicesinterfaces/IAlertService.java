package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.Alert;

import java.util.List;
import java.util.Optional;

public interface IAlertService {
    public List<Alert> list();
    public Alert insert(Alert a);
    public Optional<Alert> listId(int id);
    public void update(Alert a);
    public void delete(int id);
}
