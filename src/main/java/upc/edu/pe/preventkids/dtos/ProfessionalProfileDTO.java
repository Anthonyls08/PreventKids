package upc.edu.pe.preventkids.dtos;

import upc.edu.pe.preventkids.entities.Specialty;
import upc.edu.pe.preventkids.entities.User;

public class ProfessionalProfileDTO {
    private int idProfessionalProfile;
    private String numerocolegiatura;
    private String institucion;
    private User user;
    private Specialty specialty;

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
