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

    // DECISIÓN: distritos en zonas de riesgo (prioridad de cobertura)
    @Query("SELECT d FROM District d WHERE d.zone IN ('Lima Norte', 'Lima Este', 'Lima Sur', 'Callao')")
    List<District> decidirZonasDeRiesgo();

    // DECISIÓN: distritos prioritarios segun umbral de ubigeo
    @Query("SELECT d FROM District d WHERE d.ubigeo <= :ubigeoMaximo")
    List<District> decidirPrioridadPorUbigeo(@Param("ubigeoMaximo") int ubigeoMaximo);

    // FILTRO: distritos por departamento
    @Query("SELECT d FROM District d WHERE d.nameDepartment LIKE %:departamento%")
    List<District> filtrarPorDepartamento(@Param("departamento") String departamento);
}