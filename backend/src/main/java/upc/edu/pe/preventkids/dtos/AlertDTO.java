package upc.edu.pe.preventkids.dtos;

import upc.edu.pe.preventkids.entities.Medicion;
import upc.edu.pe.preventkids.entities.TipoAlerta;

import java.time.LocalDate;

public class AlertDTO {

    private Integer idAlert;
    private Boolean  leida;
    private LocalDate generationdate;
    private TipoAlerta tipoalert;
    private Medicion medicion;

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
