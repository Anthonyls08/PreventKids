package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.District;
import java.util.List;

@Repository
public interface IDistrictRRepository extends JpaRepository<District, Integer> {
    @Query("SELECT d FROM District d WHERE LOWER(d.nameDistrict) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<District> buscarPorNombre(@Param("nombre") String nombre);

    // DECISIÓN: distritos en zonas de riesgo (prioridad de cobertura)
    @Query("SELECT d FROM District d WHERE d.zone IN ('Lima Norte', 'Lima Este', 'Lima Sur', 'Callao')")
    List<District> decidirZonasDeRiesgo();

    // DECISIÓN: distritos prioritarios segun umbral de ubigeo (menor ubigeo primero)
    @Query("SELECT d FROM District d WHERE d.ubigeo <= :ubigeoMaximo ORDER BY d.ubigeo")
    List<District> decidirPrioridadPorUbigeo(@Param("ubigeoMaximo") int ubigeoMaximo);

    // FILTRO: distritos por departamento (insensible a mayusculas)
    @Query("SELECT d FROM District d WHERE LOWER(d.nameDepartment) LIKE LOWER(CONCAT('%', :departamento, '%'))")
    List<District> filtrarPorDepartamento(@Param("departamento") String departamento);
}