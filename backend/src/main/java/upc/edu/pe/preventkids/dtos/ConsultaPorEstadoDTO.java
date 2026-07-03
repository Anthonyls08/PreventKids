package upc.edu.pe.preventkids.dtos;

public class ConsultaPorEstadoDTO {
    private String estado;
    private int cantidad;

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
