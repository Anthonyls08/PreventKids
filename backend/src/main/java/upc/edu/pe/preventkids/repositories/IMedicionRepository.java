package upc.edu.pe.preventkids.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.preventkids.entities.Medicion;

import java.util.List;

@Repository
public interface IMedicionRepository extends JpaRepository<Medicion,Integer> {
    // DECISIÓN: mediciones con IMC alto (sobrepeso u obesidad) mayor o igual al umbral
    @Query("SELECT m FROM Medicion m WHERE m.imc >= :imcMinimo AND m.clasificacionimc IN ('Sobrepeso', 'Obesidad')")
    List<Medicion> decidirAtencionPrioritaria(@Param("imcMinimo") float imcMinimo);

    // DECISIÓN: mediciones con signos vitales fuera de rango (requieren evaluación médica)
    @Query("SELECT m FROM Medicion m WHERE m.presion >= :presionMaxima OR m.temperatura >= :temperaturaMaxima")
    List<Medicion> decidirEvaluacionSignosVitales(@Param("presionMaxima") float presionMaxima,
                                                  @Param("temperaturaMaxima") float temperaturaMaxima);

    // DECISIÓN: mediciones con riesgo nutricional segun clasificacion del IMC
    @Query("SELECT m FROM Medicion m WHERE m.clasificacionimc IN ('Bajo peso', 'Obesidad')")
    List<Medicion> decidirRiesgoNutricional();

    // FILTRO: mediciones de un hijo especifico (FK idHijo)
    @Query("SELECT m FROM Medicion m WHERE m.hijo.idHijo = :idHijo")
    List<Medicion> filtrarPorHijo(@Param("idHijo") int idHijo);
}