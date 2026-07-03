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

    // GRAFICO: cantidad de limitaciones agrupadas por categoria
    @Query("SELECT p.categoryLimitation, COUNT(p) FROM PhysicalLimitation p GROUP BY p.categoryLimitation ORDER BY p.categoryLimitation")
    List<Object[]> contarPorCategoria();

    // FILTRO: limitaciones por intensidad (Baja / Media / Alta)
    @Query("SELECT p FROM PhysicalLimitation p WHERE UPPER(p.intensityLimitation) = UPPER(:intensidad)")
    List<PhysicalLimitation> filtrarPorIntensidad(@Param("intensidad") String intensidad);
}
