package upc.edu.pe.preventkids.dtos;

import java.time.LocalDateTime;

public class VirtualConsultationDTO {
    private int idVirtualConsultation;
    private LocalDateTime fechacita;
    private String estado;
    private String urlsala;
    private String proveedor;
    private int idProfessionalProfile;
    private int idUser;

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

    public int getIdProfessionalProfile() {
        return idProfessionalProfile;
    }

    public void setIdProfessionalProfile(int idProfessionalProfile) {
        this.idProfessionalProfile = idProfessionalProfile;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }
}
