package upc.edu.pe.preventkids.dtos;

public class EducationalContentInsertDTO {
    private int idEducationalContent;
    private String tittleEducationalContent;
    private String descriptionEC;
    private String urlContent;
    private String typeEC;
    //private int idProfessionalProfile;
    //private int idTipocontenido;


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
}