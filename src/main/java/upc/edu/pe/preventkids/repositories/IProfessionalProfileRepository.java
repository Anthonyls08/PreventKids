package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;
@Repository
public interface IProfessionalProfileRepository extends JpaRepository<ProfessionalProfile, Integer> {
}
