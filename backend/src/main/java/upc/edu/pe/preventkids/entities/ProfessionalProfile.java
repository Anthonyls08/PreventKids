package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

@Entity
@Table(name="ProfessionalProfile")
public class ProfessionalProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProfessionalProfile;

    @Column(name = "numerocolegiatura", length = 100, nullable = false)
    private String numerocolegiatura;

    @Column(length = 100, nullable = false)
    private String institucion;

    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "idSpecialty", nullable = false)
    private Specialty specialty;

    public ProfessionalProfile() {
    }

    public ProfessionalProfile(int idProfessionalProfile, String numerocolegiatura, String institucion, User user, Specialty specialty) {
        this.idProfessionalProfile = idProfessionalProfile;
        this.numerocolegiatura = numerocolegiatura;
        this.institucion = institucion;
        this.user = user;
        this.specialty = specialty;
    }

    public int getIdProfessionalProfile() {
        return idProfessionalProfile;
    }

    public void setIdProfessionalProfile(int idProfessionalProfile) {
        this.idProfessionalProfile = idProfessionalProfile;
    }

    public String getNumerocolegiatura() {
        return numerocolegiatura;
    }

    public void setNumerocolegiatura(String numerocolegiatura) {
        this.numerocolegiatura = numerocolegiatura;
    }

    public String getInstitucion() {
        return institucion;
    }

    public void setInstitucion(String institucion) {
        this.institucion = institucion;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Specialty getSpecialty() {
        return specialty;
    }

    public void setSpecialty(Specialty specialty) {
        this.specialty = specialty;
    }
}
