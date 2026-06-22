package upc.edu.pe.preventkids.dtos;

public class PhysicalLimitationDTO {
    private int idPhysicalLimitation;
    private String nameLimitation;
    private String descriptionLimitation;
    private String categoryLimitation;

    public int getIdPhysicalLimitation() {
        return idPhysicalLimitation;
    }

    public void setIdPhysicalLimitation(int idPhysicalLimitation) {
        this.idPhysicalLimitation = idPhysicalLimitation;
    }

    public String getNameLimitation() {
        return nameLimitation;
    }

    public void setNameLimitation(String nameLimitation) {
        this.nameLimitation = nameLimitation;
    }

    public String getDescriptionLimitation() {
        return descriptionLimitation;
    }

    public void setDescriptionLimitation(String descriptionLimitation) {
        this.descriptionLimitation = descriptionLimitation;
    }

    public String getCategoryLimitation() {
        return categoryLimitation;
    }

    public void setCategoryLimitation(String categoryLimitation) {
        this.categoryLimitation = categoryLimitation;
    }
}
