package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

// Hijo del padre o tutor: los ninos no tienen cuenta propia, el padre
// los registra dentro de la app y sus mediciones apuntan a esta entidad.
@Entity
@Table(name = "Hijo")
public class Hijo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idHijo;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "apellido", length = 100, nullable = false)
    private String apellido;

    @Column(name = "fechanacimiento", nullable = false)
    private LocalDate fechanacimiento;

    @Column(name = "genero", length = 20, nullable = false)
    private String genero;

    // Padre o tutor responsable (usuario con rol PADRE)
    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "idPhysicalLimitation", nullable = true)
    private PhysicalLimitation physicallimitation;

    public Hijo() {
    }

    public Hijo(int idHijo, String nombre, String apellido, LocalDate fechanacimiento,
                String genero, User user, PhysicalLimitation physicallimitation) {
        this.idHijo = idHijo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechanacimiento = fechanacimiento;
        this.genero = genero;
        this.user = user;
        this.physicallimitation = physicallimitation;
    }

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
