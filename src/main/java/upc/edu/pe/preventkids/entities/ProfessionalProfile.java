package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

@Entity
@Table(name="professionalprofile")
public class ProfessionalProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProfessionalProfile;
}
