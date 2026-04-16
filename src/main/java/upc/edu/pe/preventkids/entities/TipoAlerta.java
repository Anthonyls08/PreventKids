package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

@Entity
@Table(name="TipoAlerta")
public class TipoAlerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTipoalerta;

    @Column(name="nombre", length=20, nullable = false)
    private String nombre;

    @Column(name="nivelriesgo", nullable = false)
    private int nivelriesgo;

    @Column(name="descripcion", length=250, nullable = false)
    private String descripcion;

    @Column(name="atencionprof", nullable = false)
    private boolean atencionprof;

    @Column(name="mensaje", length=100, nullable = false)
    private String mensaje;

    public TipoAlerta(){

    }

    public TipoAlerta(int idTipoalerta, String nombre, int nivelriesgo, String descripcion, boolean atencionprof, String mensaje) {
        this.idTipoalerta = idTipoalerta;
        this.nombre = nombre;
        this.nivelriesgo = nivelriesgo;
        this.descripcion = descripcion;
        this.atencionprof = atencionprof;
        this.mensaje = mensaje;
    }

    public int getIdTipoalerta() {
        return idTipoalerta;
    }

    public void setIdTipoalerta(int idTipoalerta) {
        this.idTipoalerta = idTipoalerta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getNivelriesgo() {
        return nivelriesgo;
    }

    public void setNivelriesgo(int nivelriesgo) {
        this.nivelriesgo = nivelriesgo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isAtencionprof() {
        return atencionprof;
    }

    public void setAtencionprof(boolean atencionprof) {
        this.atencionprof = atencionprof;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
