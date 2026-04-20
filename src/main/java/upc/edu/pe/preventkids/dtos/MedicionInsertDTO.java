package upc.edu.pe.preventkids.dtos;

import java.time.LocalDate;

public class MedicionInsertDTO {
    private int idMedicion;
    private float pesoKg;
    private float tallaCm;
    private float imc;
    private String clasificacion_imc;
    private float presion;
    private float temperatura;
    private LocalDate fecha_medicion;

    public int getIdMedicion() {
        return idMedicion;
    }

    public void setIdMedicion(int idMedicion) {
        this.idMedicion = idMedicion;
    }

    public float getPesoKg() {
        return pesoKg;
    }

    public void setPesoKg(float pesoKg) {
        this.pesoKg = pesoKg;
    }

    public float getTallaCm() {
        return tallaCm;
    }

    public void setTallaCm(float tallaCm) {
        this.tallaCm = tallaCm;
    }

    public float getImc() {
        return imc;
    }

    public void setImc(float imc) {
        this.imc = imc;
    }

    public String getClasificacion_imc() {
        return clasificacion_imc;
    }

    public void setClasificacion_imc(String clasificacion_imc) {
        this.clasificacion_imc = clasificacion_imc;
    }

    public float getPresion() {
        return presion;
    }

    public void setPresion(float presion) {
        this.presion = presion;
    }

    public float getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(float temperatura) {
        this.temperatura = temperatura;
    }

    public LocalDate getFecha_medicion() {
        return fecha_medicion;
    }

    public void setFecha_medicion(LocalDate fecha_medicion) {
        this.fecha_medicion = fecha_medicion;
    }
}
