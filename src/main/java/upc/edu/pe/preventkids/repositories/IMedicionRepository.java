package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.Medicion;

import java.util.List;

@Repository
public interface IMedicionRepository extends JpaRepository<Medicion,Integer> {
    @Query("SELECT m FROM Medicion m WHERE m.imc >= :imcMinimo AND m.clasificacionimc = 'Obesidad'")
    List<Medicion> decidirAtencionPrioritaria(@Param("imcMinimo") float imcMinimo);
}
