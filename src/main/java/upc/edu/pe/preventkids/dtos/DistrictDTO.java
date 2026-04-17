package upc.edu.pe.preventkids.dtos;

public class DistrictDTO {
    private String nameDistrict;
    private String nameDepartment;
    private String zone;
    private int ubigeo;

    public int getUbigeo() { return ubigeo; }

    public void setUbigeo(int ubigeo) { this.ubigeo = ubigeo; }

    public String getNameDistrict() { return nameDistrict; }

    public void setNameDistrict(String nameDistrict) { this.nameDistrict = nameDistrict;}

    public String getNameDepartment() { return nameDepartment; }

    public void setNameDepartment(String nameDepartment) { this.nameDepartment = nameDepartment; }

    public String getZone() { return zone; }

    public void setZone(String zone) { this.zone = zone; }

}
