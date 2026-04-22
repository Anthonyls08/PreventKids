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
    private String clasificacion_imc;

    @Column(name = "presion", nullable = false)
    private float presion;

    @Column(name = "temperatura", nullable = false)
    private float temperatura;

    @Column(name = "fecha_medicion", nullable = false)
    private LocalDate fecha_medicion;

    @OneToOne
    @Column(name = "idUser", nullable = false)
    private User user;

    public Medicion() {
    }

    public Medicion(int idMedicion, float pesoKg, float tallaCm, float imc, String clasificacion_imc, float presion, float temperatura, LocalDate fecha_medicion, User user) {
        this.idMedicion = idMedicion;
        this.pesoKg = pesoKg;
        this.tallaCm = tallaCm;
        this.imc = imc;
        this.clasificacion_imc = clasificacion_imc;
        this.presion = presion;
        this.temperatura = temperatura;
        this.fecha_medicion = fecha_medicion;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}