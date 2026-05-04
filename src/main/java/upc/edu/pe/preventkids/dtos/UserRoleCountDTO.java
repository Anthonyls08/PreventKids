package upc.edu.pe.preventkids.dtos;

public class UserRoleCountDTO {
    private String nombreRol;
    private int cantidadUsuarios;

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }

    public int getCantidadUsuarios() {
        return cantidadUsuarios;
    }

    public void setCantidadUsuarios(int cantidadUsuarios) {
        this.cantidadUsuarios = cantidadUsuarios;
    }
}
