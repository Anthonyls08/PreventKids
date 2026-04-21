package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "virtualconsultation")
public class VirtualConsultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVirtualConsultation;

    @Column(nullable = false)
    private LocalDateTime fechacita;

    @Column(length = 20, nullable = false)
    private String estado;

    @Column(length = 120, nullable = false)
    private String urlsala;

    @Column(length = 20, nullable = false)
    private String proveedor;

    @ManyToOne
    @JoinColumn(name = "idProfessionalProfile", nullable = false)
    private ProfessionalProfile professionalprofile;

    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User user;

    public VirtualConsultation() {
    }

    public VirtualConsultation(int idVirtualConsultation, LocalDateTime fechacita, String estado, String urlsala, String proveedor, ProfessionalProfile professionalprofile, User user) {
        this.idVirtualConsultation = idVirtualConsultation;
        this.fechacita = fechacita;
        this.estado = estado;
        this.urlsala = urlsala;
        this.proveedor = proveedor;
        this.professionalprofile = professionalprofile;
        this.user = user;
    }

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

    public ProfessionalProfile getProfessionalprofile() {
        return professionalprofile;
    }

    public void setProfessionalprofile(ProfessionalProfile professionalprofile) {
        this.professionalprofile = professionalprofile;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
