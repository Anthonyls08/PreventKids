package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.VirtualConsultation;

import java.util.List;

@Repository
public interface IVirtualConsultationRepository extends JpaRepository<VirtualConsultation,Integer> {
    @Query(value = "SELECT v.* FROM virtual_consultation v " +
                    "INNER JOIN users u ON v.id_user = u.id_user " +
                    "WHERE v.estado = :estadoConsulta AND u.nombre = :nombrePaciente",
            nativeQuery = true
    )
    List<VirtualConsultation> decidirPrioridadConsultaPaciente(
            @Param("estadoConsulta") String estadoConsulta,
            @Param("nombrePaciente") String nombrePaciente
    );
}
