package upc.edu.pe.preventkids.dtos;

import upc.edu.pe.preventkids.entities.PhysicalLimitation;
import upc.edu.pe.preventkids.entities.User;

import java.time.LocalDate;

public class HijoDTO {
    private int idHijo;
    private String nombre;
    private String apellido;
    private LocalDate fechanacimiento;
    private String genero;
    private User user;
    private PhysicalLimitation physicallimitation;

    public int getIdHijo() {
        return idHijo;
    }

    public void setIdHijo(int idHijo) {
        this.idHijo = idHijo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public LocalDate getFechanacimiento() {
        return fechanacimiento;
    }

    public void setFechanacimiento(LocalDate fechanacimiento) {
        this.fechanacimiento = fechanacimiento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PhysicalLimitation getPhysicallimitation() {
        return physicallimitation;
    }

    public void setPhysicallimitation(PhysicalLimitation physicallimitation) {
        this.physicallimitation = physicallimitation;
    }
}
