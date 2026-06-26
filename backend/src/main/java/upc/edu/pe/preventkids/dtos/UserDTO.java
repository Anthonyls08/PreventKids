package upc.edu.pe.preventkids.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public class UserDTO {
    private int idUser;
    private String nombre;
    private String apellido;
    private LocalDate fechanacimiento;
    private String genero;
    private String email;
    private int telefono;
    private boolean estado;

    private String password;

    private int idRole;
    private int idDistrict;
    private int idchatIA;
    private int idPhysicalLimitation;

    public UserDTO() {
    }
    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public int getIdRole() {
        return idRole;
    }

    public void setIdRole(int idRole) {
        this.idRole = idRole;
    }

    public int getIdDistrict() {
        return idDistrict;
    }

    public void setIdDistrict(int idDistrict) {
        this.idDistrict = idDistrict;
    }

    public int getIdchatIA() {
        return idchatIA;
    }

    public void setIdchatIA(int idchatIA) {
        this.idchatIA = idchatIA;
    }

    public int getIdPhysicalLimitation() {
        return idPhysicalLimitation;
    }

    public void setIdPhysicalLimitation(int idPhysicalLimitation) {
        this.idPhysicalLimitation = idPhysicalLimitation;
    }
}
