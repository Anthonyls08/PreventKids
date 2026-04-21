package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="Alert")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idAlert;

    @Column(name="leida", nullable = false)
    private boolean  leida;

    @Column(name="generationdate", nullable = false)
    private LocalDate generationdate;

    @OneToOne
    @JoinColumn(name="idTipoalerta")
    private TipoAlerta tipoalert;

    @OneToOne
    @JoinColumn(name="idMedicion")
    private Medicion medicion;

    public Alert(){
    }

    public Alert(int idAlert, boolean leida, LocalDate generationdate, TipoAlerta tipoalert, Medicion medicion) {
        this.idAlert = idAlert;
        this.leida = leida;
        this.generationdate = generationdate;
        this.tipoalert = tipoalert;
        this.medicion = medicion;
    }

    public int getIdAlert() {
        return idAlert;
    }

    public void setIdAlert(int idAlert) {
        this.idAlert = idAlert;
    }

    public boolean isLeida() {
        return leida;
    }

    public void setLeida(boolean leida) {
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
