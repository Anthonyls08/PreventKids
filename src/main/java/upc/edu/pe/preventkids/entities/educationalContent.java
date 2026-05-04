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

    //@ManytoOne
    //@JoingColumn(name = "idProfessionalProfile");
    //private ProfessionalProfile professionalprofile;

    //@ManytoOne
    //@JoingColumn(name = "idTipocontenido");
    //private TipoContenido typecontent;


    public educationalContent() {
    }

    public educationalContent(int idEducationalContent, String tittleEducationalContent, String descriptionEC, String urlContent, String typeEC) {
        this.idEducationalContent = idEducationalContent;
        this.tittleEducationalContent = tittleEducationalContent;
        this.descriptionEC = descriptionEC;
        this.urlContent = urlContent;
        this.typeEC = typeEC;
        //this.professionalprofile = professionalprofile;
        //this.typecontent = typecontent;
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

    //public ProfessionalProfile getProfesionalProfile() {return professionalprofile;}
    //public void setProfessionalProfile(ProfessionalProfile professionalprofile) { this.professionalprofile = professionalprofile; }

    //public TipoContenido getTipoContenido() {return typecontent;}
    //public void setTipoContenido(TipoCOntenido typecontent) {this.typecontent = typecontent; }
}

