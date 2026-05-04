package upc.edu.pe.preventkids.dtos;

public class SpecialtyDTO {
    private int idSpecialty;
    private String nombre;
    private String descripcion;
    private String area;
    private boolean atencionvirtual;

    public int getIdSpecialty() {
        return idSpecialty;
    }

    public void setIdSpecialty(int idSpecialty) {
        this.idSpecialty = idSpecialty;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public boolean isAtencionvirtual() {
        return atencionvirtual;
    }

    public void setAtencionvirtual(boolean atencionvirtual) {
        this.atencionvirtual = atencionvirtual;
    }
}
