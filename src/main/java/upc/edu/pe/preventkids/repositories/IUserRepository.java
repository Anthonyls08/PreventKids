package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.User;
@Repository
public interface IUserRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);
}
