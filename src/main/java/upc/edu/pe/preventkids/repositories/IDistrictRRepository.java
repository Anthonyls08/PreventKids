package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.District;
import java.util.List;

@Repository
public interface IDistrictRRepository extends JpaRepository<District, Integer> {
    @Query("SELECT d FROM District d WHERE d.nameDistrict LIKE %:nombre%")
    List<District> buscarPorNombre(@Param("nombre") String nombre);
}