package upc.edu.pe.preventkids.dtos;

import upc.edu.pe.preventkids.entities.User;

import java.time.LocalDate;

public class MedicionDTO {
    private float pesoKg;
    private float tallaCm;
    private float imc;
    private String clasificacionimc;
    private float presion;
    private float temperatura;
    private LocalDate fechamedicion;
    private User user;

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

    public String getClasificacionimc() {
        return clasificacionimc;
    }

    public void setClasificacionimc(String clasificacionimc) {
        this.clasificacionimc = clasificacionimc;
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

    public LocalDate getFechamedicion() {
        return fechamedicion;
    }

    public void setFechamedicion(LocalDate fechamedicion) {
        this.fechamedicion = fechamedicion;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
