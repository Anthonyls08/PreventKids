package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upc.edu.pe.preventkids.entities.Hijo;

import java.util.List;

public interface IHijoRepository extends JpaRepository<Hijo, Integer> {
    // Hijos del padre autenticado (el email viene del token JWT)
    List<Hijo> findByUser_Email(String email);
}
