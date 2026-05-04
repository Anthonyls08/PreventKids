package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.Specialty;

import java.util.List;

@Repository
public interface ISpecialtyRepository extends JpaRepository<Specialty,Integer> {
List<Specialty> findByArea(String area);
@Query("SELECT s FROM Specialty s WHERE s.atencionvirtual = :virtual")
List<Specialty> buscarPorAtencionVirtual(@Param("virtual") boolean virtual);
}
