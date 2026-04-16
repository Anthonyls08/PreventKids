package upc.edu.pe.preventkids.entities;

import jakarta.persistence.*;

@Entity
@Table(name="chatIA")
public class chatIA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idchatIA;

    @Column (name="pregunta", length=100, nullable= false)
    private String pregunta;

    @Column (name="respuesta", length=100, nullable= false)
    private String respuesta;

public chatIA(){
}

    public chatIA(int idchatIA, String pregunta, String respuesta) {
        this.idchatIA = idchatIA;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
    }

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
