package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upc.edu.pe.preventkids.entities.PhysicalLimitation;

public interface IPhysicalLimitationRepository extends JpaRepository<PhysicalLimitation, Integer>  {
}
