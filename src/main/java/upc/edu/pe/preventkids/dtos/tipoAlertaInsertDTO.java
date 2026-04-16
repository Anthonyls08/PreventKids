package upc.edu.pe.preventkids.dtos;


public class tipoAlertaInsertDTO {
   private int idTipoalerta;
   private String nombre;
    private int nivelriesgo;
    private String descripcion;
    private boolean atencionprof;
    private String mensaje;

    public int getIdTipoalerta() {
        return idTipoalerta;
    }

    public void setIdTipoalerta(int idTipoalerta) {
        this.idTipoalerta = idTipoalerta;
    }

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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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
