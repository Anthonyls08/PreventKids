package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "District")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDistrict;

    @Column(name = "nameDistrict", length = 20 , nullable = false)
    private String nameDistrict;

    @Column(name = "nameDepartment", length = 100 , nullable = false)
    private String nameDepartment;

    @Column(name = "ubigeo", nullable = false)
    private int ubigeo;

    @Column(name = "zone", length = 20, nullable = false)
    private String zone;

    public District() {
    }


    public District(int idDistrict, String nameDistrict, String nameDepartment, int ubigeo, String zone) {
        this.idDistrict = idDistrict;
        this.nameDistrict = nameDistrict;
        this.nameDepartment = nameDepartment;
        this.ubigeo = ubigeo;
        this.zone = zone;
    }

    public int getIdDistrict() {
        return idDistrict;
    }

    public void setIdDistrict(int idDistrict) {
        this.idDistrict = idDistrict;
    }

    public String getNameDistrict() {
        return nameDistrict;
    }

    public void setNameDistrict(String nameDistrict) {
        this.nameDistrict = nameDistrict;
    }

    public String getNameDepartment() {
        return nameDepartment;
    }

    public void setNameDepartment(String nameDepartment) {
        this.nameDepartment = nameDepartment;
    }

    public int getUbigeo() {
        return ubigeo;
    }

    public void setUbigeo(int ubigeo) {
        this.ubigeo = ubigeo;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }
}