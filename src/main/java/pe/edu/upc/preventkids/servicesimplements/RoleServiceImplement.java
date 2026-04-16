package pe.edu.upc.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.preventkids.entities.Role;
import pe.edu.upc.preventkids.repositories.IRoleRepository;
import pe.edu.upc.preventkids.servicesinterfaces.IRoleService;

import java.util.List;
import java.util.Optional;
@Service
public class RoleServiceImplement implements IRoleService {
    @Autowired
    private IRoleRepository rR;

    @Override
    public List<Role> list() {
        return rR.findAll();
    }

    @Override
    public Role insert(Role r) {
        return rR.save(r);
    }

    @Override
    public Optional<Role> listId(int id) {
        return rR.findById(id);
    }

    @Override
    public void update(Role r) {
        rR.save(r);
    }

    @Override
    public void delete(int id) {
        rR.deleteById(id);
    }
}
