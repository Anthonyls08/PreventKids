package upc.edu.pe.preventkids.dtos;

import java.time.LocalDate;

public class UserDTO {
    private int idUser;
    private String nombre;
    private String apellido;
    private LocalDate fechanacimiento;
    private String genero;
    private String email;
    private String password;
    private int telefono;
    private String estado;

    private RoleDTO idRole;
    private DistrictDTO idDistrict;
    private chatIADTO chatia;
    private PhysicalLimitationDTO physicallimitation;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public RoleDTO getIdRole() {
        return idRole;
    }

    public void setIdRole(RoleDTO idRole) {
        this.idRole = idRole;
    }

    public DistrictDTO getIdDistrict() {
        return idDistrict;
    }

    public void setIdDistrict(DistrictDTO idDistrict) {
        this.idDistrict = idDistrict;
    }

    public chatIADTO getChatia() {
        return chatia;
    }

    public void setChatia(chatIADTO chatia) {
        this.chatia = chatia;
    }

    public PhysicalLimitationDTO getPhysicallimitation() {
        return physicallimitation;
    }

    public void setPhysicallimitation(PhysicalLimitationDTO physicallimitation) {
        this.physicallimitation = physicallimitation;
    }
}
