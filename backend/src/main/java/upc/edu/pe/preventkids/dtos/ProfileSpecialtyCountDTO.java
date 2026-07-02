package upc.edu.pe.preventkids.dtos;

public class ProfileSpecialtyCountDTO {
    private String nombreEspecialidad;
    private int cantidadPerfiles;

    public String getNombreEspecialidad() {
        return nombreEspecialidad;
    }

    public void setNombreEspecialidad(String nombreEspecialidad) {
        this.nombreEspecialidad = nombreEspecialidad;
    }

    public int getCantidadPerfiles() {
        return cantidadPerfiles;
    }

    public void setCantidadPerfiles(int cantidadPerfiles) {
        this.cantidadPerfiles = cantidadPerfiles;
    }
}
