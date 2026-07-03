package upc.edu.pe.preventkids.dtos;

public class LimitacionPorCategoriaDTO {
    private String categoria;
    private int cantidad;

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
