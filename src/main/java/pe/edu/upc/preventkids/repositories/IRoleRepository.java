package pe.edu.upc.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.preventkids.entities.Role;

@Repository
public interface IRoleRepository extends JpaRepository<Role,Integer> {
}
