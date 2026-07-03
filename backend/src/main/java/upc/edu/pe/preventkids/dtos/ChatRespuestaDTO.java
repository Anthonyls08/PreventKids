package upc.edu.pe.preventkids.dtos;

public class ChatRespuestaDTO {
    private int idchatIA;
    private String pregunta;
    private String respuesta;
    // true cuando la respuesta salio de la tabla chatIA (cache) y no de la API
    private boolean desdeCache;

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

    public boolean isDesdeCache() {
        return desdeCache;
    }

    public void setDesdeCache(boolean desdeCache) {
        this.desdeCache = desdeCache;
    }
}
