package upc.edu.pe.preventkids.dtos;

public class tipoAlertaDTO {
    private String nombre;
    private int nivelriesgo;
    private boolean atencionprof;
    private String mensaje;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getNivelriesgo() {
        return nivelriesgo;
    }

    public void setNivelriesgo(int nivelriesgo) {
        this.nivelriesgo = nivelriesgo;
    }

    public boolean isAtencionprof() {
        return atencionprof;
    }

    public void setAtencionprof(boolean atencionprof) {
        this.atencionprof = atencionprof;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
