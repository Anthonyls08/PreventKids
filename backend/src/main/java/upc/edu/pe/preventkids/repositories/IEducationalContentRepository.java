package upc.edu.pe.preventkids.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.educationalContent;

import java.util.List;

@Repository
public interface IEducationalContentRepository extends JpaRepository<educationalContent, Integer> {
    @Query("SELECT e FROM educationalContent e WHERE UPPER(e.typeEC) = UPPER(:tipo)")
    List<educationalContent> buscarPorTipo(@Param("tipo") String tipo);

    // GRAFICO: cantidad de contenidos agrupados por tipo
    @Query("SELECT e.typeEC, COUNT(e) FROM educationalContent e GROUP BY e.typeEC ORDER BY e.typeEC")
    List<Object[]> contarPorTipo();
}