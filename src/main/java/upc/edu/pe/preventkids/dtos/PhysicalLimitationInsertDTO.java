package upc.edu.pe.preventkids.dtos;

public class PhysicalLimitationInsertDTO {
    private int idPhysicalLimitation;
    private String nameLimitation;
    private String descriptionLimitation;
    private String categoryLimitation;
    private String prohibitedExercises;
    private String intensityLimitation;

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

    public String getProhibitedExercises() {
        return prohibitedExercises;
    }

    public void setProhibitedExercises(String prohibitedExercises) {
        this.prohibitedExercises = prohibitedExercises;
    }

    public String getIntensityLimitation() {
        return intensityLimitation;
    }

    public void setIntensityLimitation(String intensityLimitation) {
        this.intensityLimitation = intensityLimitation;
    }
}
