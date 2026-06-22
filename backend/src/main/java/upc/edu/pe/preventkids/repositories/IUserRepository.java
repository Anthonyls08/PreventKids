package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.User;

import java.util.List;

@Repository
public interface IUserRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);
    @Query(value = "SELECT r.nombre, COUNT(u.id_user) " +
            "FROM users u INNER JOIN role r ON u.id_role = r.id_role " +
            "GROUP BY r.nombre", nativeQuery = true)
    List<Object[]> contarUsuariosPorRol();
}
