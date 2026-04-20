package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.TipoContenido;

@Repository
public interface ITipoContenidoRepository extends JpaRepository<TipoContenido,Integer> {
}
