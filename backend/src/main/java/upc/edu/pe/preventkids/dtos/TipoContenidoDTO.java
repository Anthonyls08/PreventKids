package upc.edu.pe.preventkids.dtos;

public class TipoContenidoDTO {

    private int idTipocontenido;
    private String nombre;
    private String descripcion;
    private int duracion;

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