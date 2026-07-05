package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.Alert;

import java.util.List;

@Repository
public interface IAlertRepository extends JpaRepository<Alert,Integer> {
    @Query(value = "SELECT a.* FROM alert a " +
                    "INNER JOIN tipo_alerta t ON a.id_tipoalerta = t.id_tipoalerta " +
                    "WHERE a.leida = false AND t.nivelriesgo >= :umbralRiesgo " +
                    "ORDER BY t.nivelriesgo DESC",
            nativeQuery = true
    )
    List<Alert> obtenerAlertasNoLeidasCriticas(@Param("umbralRiesgo") int umbralRiesgo);

    @Query("SELECT CASE WHEN a.leida = true THEN 'Leída' ELSE 'No leída' END, COUNT(a) FROM Alert a GROUP BY a.leida")
    List<Object[]> contarPorEstado();
}
