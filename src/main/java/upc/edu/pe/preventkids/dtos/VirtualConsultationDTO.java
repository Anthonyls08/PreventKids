package upc.edu.pe.preventkids.dtos;

import java.time.LocalDateTime;

public class VirtualConsultationDTO {
    private int idVirtualConsultation;
    private LocalDateTime fechacita;
    private String estado;
    private String urlsala;
    private String proveedor;
    private ProfessionalProfileDTO professionalprofile;
    private UserDTO user;

    public int getIdVirtualConsultation() {
        return idVirtualConsultation;
    }

    public void setIdVirtualConsultation(int idVirtualConsultation) {
        this.idVirtualConsultation = idVirtualConsultation;
    }

    public LocalDateTime getFechacita() {
        return fechacita;
    }

    public void setFechacita(LocalDateTime fechacita) {
        this.fechacita = fechacita;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getUrlsala() {
        return urlsala;
    }

    public void setUrlsala(String urlsala) {
        this.urlsala = urlsala;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public ProfessionalProfileDTO getProfessionalprofile() {
        return professionalprofile;
    }

    public void setProfessionalprofile(ProfessionalProfileDTO professionalprofile) {
        this.professionalprofile = professionalprofile;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
