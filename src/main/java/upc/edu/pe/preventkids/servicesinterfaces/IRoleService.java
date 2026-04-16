package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.Role;

import java.util.List;
import java.util.Optional;

public interface IRoleService {
    public List<Role> list();
    public Role insert(Role r);
    public Optional<Role> listId(int id);
    public void update(Role r);
    public void delete(int id);
}
