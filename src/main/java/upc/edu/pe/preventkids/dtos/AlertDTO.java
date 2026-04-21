package upc.edu.pe.preventkids.dtos;

import upc.edu.pe.preventkids.entities.Medicion;
import upc.edu.pe.preventkids.entities.TipoAlerta;

import java.time.LocalDate;

public class AlertDTO {

    private int idAlert;
    private boolean  leida;
    private LocalDate generationdate;
    private TipoAlerta tipoalert;
    private Medicion medicion;

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
