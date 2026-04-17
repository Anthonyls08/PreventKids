package upc.edu.pe.preventkids.entities;
import jakarta.persistence.*;

@Entity
@Table(name = "PhysicalLimitation")
public class PhysicalLimitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPhysicalLimitation;

    @Column(name= "nameLimitation", length = 20, nullable = false)
    private String nameLimitation;

    @Column(name= "descriptionLimitation", length = 200, nullable = false)
    private String descriptionLimitation;

    @Column(name= "categoryLimitation", length = 20, nullable = false)
    private String categoryLimitation;

    @Column(name= "prohibitedExercises", length = 20, nullable = false)
    private String prohibitedExercises;

    @Column(name= "intensityLimitation", length = 20, nullable = false)
    private String intensityLimitation;

    public PhysicalLimitation() {
    }

    public PhysicalLimitation(int idPhysicalLimitation, String nameLimitation, String descriptionLimitation, String categoryLimitation, String prohibitedExercises, String intensityLimitation) {
        this.idPhysicalLimitation = idPhysicalLimitation;
        this.nameLimitation = nameLimitation;
        this.descriptionLimitation = descriptionLimitation;
        this.categoryLimitation = categoryLimitation;
        this.prohibitedExercises = prohibitedExercises;
        this.intensityLimitation = intensityLimitation;
    }

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
