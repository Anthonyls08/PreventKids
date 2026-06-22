package upc.edu.pe.preventkids.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class DistrictInsertDTO {
    @JsonIgnore
    private int idDistrict;

    private String nameDistrict;
    private String nameDepartment;
    private int ubigeo;
    private String zone;

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
