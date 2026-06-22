package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Specialty")
public class Specialty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idSpecialty;

    @Column(length = 50, nullable = false)
    private String nombre;

    @Column(length = 100, nullable = false)
    private String descripcion;

    @Column(length = 50, nullable = false)
    private String area;

    @Column(nullable = false)
    private boolean atencionvirtual;

    public Specialty() {
    }

    public Specialty(int idSpecialty, String nombre, String descripcion, String area, boolean atencionvirtual) {
        this.idSpecialty = idSpecialty;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.area = area;
        this.atencionvirtual = atencionvirtual;
    }

    public int getIdSpecialty() {
        return idSpecialty;
    }

    public void setIdSpecialty(int idSpecialty) {
        this.idSpecialty = idSpecialty;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public boolean isAtencionvirtual() {
        return atencionvirtual;
    }

    public void setAtencionvirtual(boolean atencionvirtual) {
        this.atencionvirtual = atencionvirtual;
    }
}
