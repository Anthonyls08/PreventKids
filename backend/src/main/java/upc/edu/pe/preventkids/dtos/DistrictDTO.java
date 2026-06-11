package upc.edu.pe.preventkids.dtos;

public class DistrictDTO {
    private int idDistrict;
    private String nameDistrict;
    private String nameDepartment;
    private String zone;
    private int ubigeo;

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

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public int getUbigeo() {
        return ubigeo;
    }

    public void setUbigeo(int ubigeo) {
        this.ubigeo = ubigeo;
    }
}
