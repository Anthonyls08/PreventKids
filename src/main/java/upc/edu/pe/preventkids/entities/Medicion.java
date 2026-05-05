package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Medicion")
public class Medicion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMedicion;

    @Column(name = "peso_kg", nullable = false)
    private float pesoKg;

    @Column(name = "talla_cm", nullable = false)
    private float tallaCm;

    @Column(name = "imc", nullable = false)
    private float imc;

    @Column(name = "clasificacion_imc", length = 15, nullable = false)
    private String clasificacionimc;

    @Column(name = "presion", nullable = false)
    private float presion;

    @Column(name = "temperatura", nullable = false)
    private float temperatura;

    @Column(name = "fecha_medicion", nullable = false)
    private LocalDate fechamedicion;

    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User user;

    public Medicion() {
    }

    public Medicion(int idMedicion, float pesoKg, float tallaCm, float imc, String clasificacionimc, float presion, float temperatura, LocalDate fechamedicion, User user) {
        this.idMedicion = idMedicion;
        this.pesoKg = pesoKg;
        this.tallaCm = tallaCm;
        this.imc = imc;
        this.clasificacionimc = clasificacionimc;
        this.presion = presion;
        this.temperatura = temperatura;
        this.fechamedicion = fechamedicion;
        this.user = user;
    }

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