package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    public List<User> list();
    public User insert(User u);
    public Optional<User> listId(int id);
    public void update(User u);
    public void delete(int id);
}
