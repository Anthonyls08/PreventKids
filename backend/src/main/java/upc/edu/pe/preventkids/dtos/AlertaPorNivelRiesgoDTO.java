package upc.edu.pe.preventkids.dtos;

public class AlertaPorNivelRiesgoDTO {
    private int nivelRiesgo;
    private int cantidad;

    public int getNivelRiesgo() {
        return nivelRiesgo;
    }

    public void setNivelRiesgo(int nivelRiesgo) {
        this.nivelRiesgo = nivelRiesgo;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
