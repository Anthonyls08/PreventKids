package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;

import java.util.List;

@Repository
public interface IProfessionalProfileRepository extends JpaRepository<ProfessionalProfile, Integer> {
    @Query(value = "SELECT s.nombre, COUNT(pp.id_professional_profile) AS total " +
            "FROM specialty s LEFT JOIN professional_profile pp ON pp.id_specialty = s.id_specialty " +
            "GROUP BY s.nombre " +
            "ORDER BY s.nombre", nativeQuery = true)
    List<Object[]> contarPerfilesPorEspecialidad();
}
