package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.PhysicalLimitation;

import java.util.List;

@Repository
public interface IPhysicalLimitationRepository extends JpaRepository<PhysicalLimitation, Integer>  {
    @Query("SELECT p FROM PhysicalLimitation p WHERE p.categoryLimitation = :categoria")
    List<PhysicalLimitation> buscarPorCategoria(@Param("categoria") String categoria);
}
