package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.TipoContenido;

import java.util.List;

@Repository
public interface ITipoContenidoRepository extends JpaRepository<TipoContenido,Integer> {
    @Query(value = "SELECT * FROM tipo_contenido tc WHERE tc.duracion <= :duracionMax AND tc.nombre = :categoria",
            nativeQuery = true)
    List<TipoContenido> decidirContenidoRapido(
            @Param("duracionMax") int duracionMax,
            @Param("categoria") String categoria);
}
