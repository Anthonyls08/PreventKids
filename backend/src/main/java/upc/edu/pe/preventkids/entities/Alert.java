package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="Alert")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAlert;

    @Column(name="leida", nullable = true)
    private Boolean leida;

    @Column(name="generationdate", nullable = false)
    private LocalDate generationdate;

    @ManyToOne
    @JoinColumn(name="idTipoalerta")
    private TipoAlerta tipoalert;

    @ManyToOne
    @JoinColumn(name="idMedicion")
    private Medicion medicion;

    public Alert(){
    }

    public Alert(Integer idAlert, Boolean leida, LocalDate generationdate, TipoAlerta tipoalert, Medicion medicion) {
        this.idAlert = idAlert;
        this.leida = leida;
        this.generationdate = generationdate;
        this.tipoalert = tipoalert;
        this.medicion = medicion;
    }

    public Integer getIdAlert() {
        return idAlert;
    }

    public void setIdAlert(Integer idAlert) {
        this.idAlert = idAlert;
    }

    public Boolean isLeida() {
        return leida;
    }

    public void setLeida(Boolean leida) {
        this.leida = leida;
    }

    public LocalDate getGenerationdate() {
        return generationdate;
    }

    public void setGenerationdate(LocalDate generationdate) {
        this.generationdate = generationdate;
    }

    public TipoAlerta getTipoalert() {
        return tipoalert;
    }

    public void setTipoalert(TipoAlerta tipoalert) {
        this.tipoalert = tipoalert;
    }

    public Medicion getMedicion() {
        return medicion;
    }

    public void setMedicion(Medicion medicion) {
        this.medicion = medicion;
    }
}
