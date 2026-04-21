package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUser;

    @Column(length = 150, nullable = false)
    private String nombre;

    @Column(length = 50, nullable = false)
    private String apellido;

    private LocalDate fechanacimiento;

    @Column(length = 50, nullable = false)
    private String genero;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    private int telefono;

    @Column(length = 20, nullable = false)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "idRole", nullable = false)
    private Role idRole;

    @ManyToOne
    @JoinColumn(name = "idDistrict", nullable = false)
    private District idDistrict;

    @ManyToOne
    @JoinColumn(name = "idchatIA", nullable = false)
    private chatIA chatia;

    @ManyToOne
    @JoinColumn(name = "idPhysicalLimitation", nullable = false)
    private PhysicalLimitation physicallimitation;

    public User() {
    }

    public User(int idUser, String nombre, String apellido, LocalDate fechanacimiento, String genero, String email, String password, int telefono, String estado, Role idRole, District idDistrict, chatIA chatia, PhysicalLimitation physicallimitation) {
        this.idUser = idUser;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechanacimiento = fechanacimiento;
        this.genero = genero;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.estado = estado;
        this.idRole = idRole;
        this.idDistrict = idDistrict;
        this.chatia = chatia;
        this.physicallimitation = physicallimitation;
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

    public Role getIdRole() {
        return idRole;
    }

    public void setIdRole(Role idRole) {
        this.idRole = idRole;
    }

    public District getIdDistrict() {
        return idDistrict;
    }

    public void setIdDistrict(District idDistrict) {
        this.idDistrict = idDistrict;
    }

    public chatIA getChatia() {
        return chatia;
    }

    public void setChatia(chatIA chatia) {
        this.chatia = chatia;
    }

    public PhysicalLimitation getPhysicallimitation() {
        return physicallimitation;
    }

    public void setPhysicallimitation(PhysicalLimitation physicallimitation) {
        this.physicallimitation = physicallimitation;
    }
}


