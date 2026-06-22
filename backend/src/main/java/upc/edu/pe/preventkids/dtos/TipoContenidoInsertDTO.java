package upc.edu.pe.preventkids.dtos;

public class TipoContenidoInsertDTO {
    private int idTipoContenido;
    private String nombre;
    private String descripcion;
    private int duracion;
    public String getNombre() {
        return nombre;
    }

    public int getIdTipoContenido() {
        return idTipoContenido;
    }

    public void setIdTipoContenido(int idTipoContenido) {
        this.idTipoContenido = idTipoContenido;
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
