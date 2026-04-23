package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "RecommendedExercise")
public class RecommendedExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRecommendedExercise;

    @Column(name = "nameRecommendedExercise", length = 20,nullable = false)
    private String nameRecommendedExercise;

    @Column(name = "descriptionReExercise", length = 200,nullable = false)
    private String descriptionReExercise;

    @Column(name = "difficultRecommendedExercise", length = 20,nullable = false)
    private String difficultRecommendedExercise;

    @Column(name= "durationRecommendedExercise",nullable = false)
    private int durationRecommendedExercise;

    @Column(name = "dateRecommendedExercise",nullable = false)
    private LocalDate dateRecommendedExercise;

    @ManyToOne
    @JoinColumn(name = "idPhysicalLimitation")
    private PhysicalLimitation physicalLimitation;

    public RecommendedExercise() {
    }

    public RecommendedExercise(int idRecommendedExercise, String nameRecommendedExercise, String descriptionReExercise, String difficultRecommendedExercise, int durationRecommendedExercise, LocalDate dateRecommendedExercise, PhysicalLimitation physicalLimitation) {
        this.idRecommendedExercise = idRecommendedExercise;
        this.nameRecommendedExercise = nameRecommendedExercise;
        this.descriptionReExercise = descriptionReExercise;
        this.difficultRecommendedExercise = difficultRecommendedExercise;
        this.durationRecommendedExercise = durationRecommendedExercise;
        this.dateRecommendedExercise = dateRecommendedExercise;
        this.physicalLimitation = physicalLimitation;
    }

    public int getIdRecommendedExercise() {
        return idRecommendedExercise;
    }

    public void setIdRecommendedExercise(int idRecommendedExercise) {
        this.idRecommendedExercise = idRecommendedExercise;
    }

    public String getNameRecommendedExercise() {
        return nameRecommendedExercise;
    }

    public void setNameRecommendedExercise(String nameRecommendedExercise) {
        this.nameRecommendedExercise = nameRecommendedExercise;
    }

    public String getDescriptionReExercise() {
        return descriptionReExercise;
    }

    public void setDescriptionReExercise(String descriptionReExercise) {
        this.descriptionReExercise = descriptionReExercise;
    }

    public String getDifficultRecommendedExercise() {
        return difficultRecommendedExercise;
    }

    public void setDifficultRecommendedExercise(String difficultRecommendedExercise) {
        this.difficultRecommendedExercise = difficultRecommendedExercise;
    }

    public int getDurationRecommendedExercise() {
        return durationRecommendedExercise;
    }

    public void setDurationRecommendedExercise(int durationRecommendedExercise) {
        this.durationRecommendedExercise = durationRecommendedExercise;
    }

    public LocalDate getDateRecommendedExercise() {
        return dateRecommendedExercise;
    }

    public void setDateRecommendedExercise(LocalDate dateRecommendedExercise) {
        this.dateRecommendedExercise = dateRecommendedExercise;
    }

    public PhysicalLimitation getPhysicalLimitation() {
        return physicalLimitation;
    }

    public void setPhysicalLimitation(PhysicalLimitation physicalLimitation) {
        this.physicalLimitation = physicalLimitation;
    }
}
