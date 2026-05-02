package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.TipoAlerta;

import java.util.List;

@Repository
public interface ITipoAlertaRepository extends JpaRepository <TipoAlerta,Integer> {
    @Query("SELECT t FROM TipoAlerta t WHERE t.nivelriesgo >= :nivelRiesgo AND t.atencionprof = :requiereAtencion")
    List<TipoAlerta> filtrarPorRiesgoYAtencion(
            @Param("nivelRiesgo") int nivelRiesgo,
            @Param("requiereAtencion") boolean requiereAtencion);

}