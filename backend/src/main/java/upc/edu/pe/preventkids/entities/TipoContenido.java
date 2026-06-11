package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

@Entity
@Table(name="TipoContenido")
public class TipoContenido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTipocontenido;

    @Column(name="nombre", length=50, nullable = false)
    private String nombre;

    @Column(name="descripcion", length=100, nullable = false)
    private String descripcion;

    @Column(name="duracion", nullable = false)
    private int duracion;


    public TipoContenido() {
    }

    public TipoContenido(int idTipocontenido, String nombre, String descripcion,int duracion) {
        this.idTipocontenido = idTipocontenido;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.duracion = duracion;
    }

    public int getIdTipocontenido() {
        return idTipocontenido;
    }

    public void setIdTipocontenido(int idTipocontenido) {
        this.idTipocontenido = idTipocontenido;
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

    public int getDuracion() {
        return duracion;
    }

    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }
}
