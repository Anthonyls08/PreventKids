package upc.edu.pe.preventkids.servicesinterfaces;

import upc.edu.pe.preventkids.entities.chatIA;

import java.util.List;
import java.util.Optional;

public interface IChatIAService {
    public List<chatIA> list();
    public chatIA insert(chatIA c);
    public Optional<chatIA> listId(int id);
    public void update(chatIA c);
    public void delete(int id);
    // Busca en la tabla una pregunta parecida ya respondida (cache)
    public Optional<chatIA> buscarSimilar(String pregunta);
    // Llama a la API de Claude, guarda pregunta y respuesta, y devuelve el registro
//    public chatIA preguntarIA(String pregunta);
}
