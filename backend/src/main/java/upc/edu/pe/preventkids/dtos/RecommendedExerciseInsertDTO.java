package upc.edu.pe.preventkids.dtos;

import jakarta.persistence.Column;

import java.time.LocalDate;

public class RecommendedExerciseInsertDTO {
    private int idRecommendedExercise;
    private String nameRecommendedExercise;
    private String descriptionReExercise;
    private String difficultRecommendedExercise;
    private int durationRecommendedExercise;
    private LocalDate dateRecommendedExercise;
    private int idPhysicalLimitation;

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

    public int getIdPhysicalLimitation() {
        return idPhysicalLimitation;
    }

    public void setIdPhysicalLimitation(int idPhysicalLimitation) {
        this.idPhysicalLimitation = idPhysicalLimitation;
    }
}
