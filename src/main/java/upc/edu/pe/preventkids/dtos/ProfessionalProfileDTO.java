package upc.edu.pe.preventkids.dtos;

public class ProfessionalProfileDTO {
    private int idProfessionalProfile;
    private String numerocolegiatura;
    private String institucion;
    private int idUser;
    private int idSpecialty;

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

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public int getIdSpecialty() {
        return idSpecialty;
    }

    public void setIdSpecialty(int idSpecialty) {
        this.idSpecialty = idSpecialty;
    }
}
