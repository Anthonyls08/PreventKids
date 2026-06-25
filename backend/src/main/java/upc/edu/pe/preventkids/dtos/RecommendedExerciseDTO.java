package upc.edu.pe.preventkids.dtos;

import jakarta.persistence.Column;

public class RecommendedExerciseDTO {
    private int idRecommendedExercise;
    private String nameRecommendedExercise;
    private String descriptionReExercise;
    private String difficultRecommendedExercise;

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
}
