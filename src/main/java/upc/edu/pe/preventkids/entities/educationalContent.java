package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

@Entity
@Table(name="educationalContent")
public class educationalContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEducationalContent;

    @Column(name = "tittleEducationalContent", length = 20, nullable = false)
    private String tittleEducationalContent;

    @Column(name = "descriptionEC", length = 200, nullable = false)
    private String descriptionEC;

    @Column(name = "urlContent", length = 40, nullable = false)
    private String urlContent;

    @Column(name = "typeEC", length = 20, nullable = false)
    private String typeEC;

    @ManyToOne
    @JoinColumn(name = "idProfessionalProfile")
    private ProfessionalProfile professionalProfile;

    @ManyToOne
    @JoinColumn(name = "idTipocontenido")
    private TipoContenido typeContent;


    public educationalContent() {
    }

    public educationalContent(int idEducationalContent, String tittleEducationalContent, String descriptionEC, String urlContent, String typeEC, ProfessionalProfile professionalProfile, TipoContenido typeContent) {
        this.idEducationalContent = idEducationalContent;
        this.tittleEducationalContent = tittleEducationalContent;
        this.descriptionEC = descriptionEC;
        this.urlContent = urlContent;
        this.typeEC = typeEC;
        this.professionalProfile = professionalProfile;
        this.typeContent = typeContent;
    }

    public int getIdEducationalContent() {
        return idEducationalContent;
    }

    public void setIdEducationalContent(int idEducationalContent) {
        this.idEducationalContent = idEducationalContent;
    }

    public String getTittleEducationalContent() {
        return tittleEducationalContent;
    }

    public void setTittleEducationalContent(String tittleEducationalContent) {
        this.tittleEducationalContent = tittleEducationalContent;
    }

    public String getDescriptionEC() {
        return descriptionEC;
    }

    public void setDescriptionEC(String descriptionEC) {
        this.descriptionEC = descriptionEC;
    }

    public String getUrlContent() {
        return urlContent;
    }

    public void setUrlContent(String urlContent) {
        this.urlContent = urlContent;
    }

    public String getTypeEC() {
        return typeEC;
    }

    public void setTypeEC(String typeEC) {
        this.typeEC = typeEC;
    }

    public ProfessionalProfile getProfessionalProfile() {
        return professionalProfile;
    }

    public void setProfessionalProfile(ProfessionalProfile professionalProfile) {
        this.professionalProfile = professionalProfile;
    }

    public TipoContenido getTypeContent() {
        return typeContent;
    }

    public void setTypeContent(TipoContenido typeContent) {
        this.typeContent = typeContent;
    }
}

