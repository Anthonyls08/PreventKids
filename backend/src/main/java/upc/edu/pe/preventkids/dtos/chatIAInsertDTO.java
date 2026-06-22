package upc.edu.pe.preventkids.dtos;

public class chatIAInsertDTO {
    private int idchatIA;
    private String pregunta;
    private String respuesta;

    public int getIdchatIA() {
        return idchatIA;
    }

    public void setIdchatIA(int idchatIA) {
        this.idchatIA = idchatIA;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }
}
