package upc.edu.pe.preventkids.servicesimplements;

import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.messages.Message;
import com.anthropic.models.messages.MessageCreateParams;
import com.anthropic.models.messages.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.chatIA;
import upc.edu.pe.preventkids.repositories.IChatIARepository;
import upc.edu.pe.preventkids.servicesinterfaces.IChatIAService;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ChatiAServiceImplement implements IChatIAService {
    @Autowired
    private IChatIARepository cR;

    @Value("${anthropic.api.key:}")
    private String anthropicApiKey;

    // Umbral de similitud (0 a 1): si una pregunta guardada se parece al menos
    // en este porcentaje, se reutiliza su respuesta en vez de llamar a la API.
    private static final double UMBRAL_SIMILITUD = 0.6;

    // La columna respuesta de la tabla chatIA admite 300 caracteres
    private static final int MAX_RESPUESTA = 300;

    private static final String SYSTEM_PROMPT =
            "Eres el asistente de salud de PreventKids, una aplicacion de prevencion " +
            "de salud infantil (nutricion, ejercicio, habitos saludables y bienestar de ninos). " +
            "Responde siempre en espanol, de forma clara y amable para padres y pacientes. " +
            "Tu respuesta debe tener como maximo 250 caracteres. " +
            "Si la consulta describe una emergencia o algo grave, recomienda acudir a un " +
            "profesional de salud. No des diagnosticos definitivos.";

    @Override
    public List<chatIA> list() {return cR.findAll();}

    @Override
    public chatIA insert(chatIA c) {return cR.save(c);}

    @Override
    public Optional<chatIA> listId(int id) {return cR.findById(id); }

    @Override
    public void update(chatIA c) {cR.save(c);}

    @Override
    public void delete(int id) {cR.deleteById(id);}

    // ===== Cache de preguntas similares =====

    @Override
    public Optional<chatIA> buscarSimilar(String pregunta) {
        Set<String> palabrasNueva = tokenizar(pregunta);
        chatIA mejor = null;
        double mejorSimilitud = 0;

        for (chatIA registro : cR.findAll()) {
            double similitud = similitudJaccard(palabrasNueva, tokenizar(registro.getPregunta()));
            if (similitud > mejorSimilitud) {
                mejorSimilitud = similitud;
                mejor = registro;
            }
        }

        if (mejor != null && mejorSimilitud >= UMBRAL_SIMILITUD) {
            return Optional.of(mejor);
        }
        return Optional.empty();
    }

    // Normaliza el texto (minusculas, sin tildes ni signos) y lo parte en palabras
    private Set<String> tokenizar(String texto) {
        String limpio = Normalizer.normalize(texto.toLowerCase().trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")       // quita tildes
                .replaceAll("[^a-z0-9 ]", " ")  // quita signos de puntuacion
                .replaceAll("\\s+", " ")
                .trim();
        if (limpio.isEmpty()) {
            return new HashSet<>();
        }
        return new HashSet<>(Arrays.asList(limpio.split(" ")));
    }

    // Similitud de Jaccard: interseccion de palabras / union de palabras
    private double similitudJaccard(Set<String> a, Set<String> b) {
        if (a.isEmpty() || b.isEmpty()) {
            return 0;
        }
        Set<String> interseccion = new HashSet<>(a);
        interseccion.retainAll(b);
        Set<String> union = new HashSet<>(a);
        union.addAll(b);
        return (double) interseccion.size() / union.size();
    }

    // ===== Llamada a la API de Claude =====

//    @Override
//    public chatIA preguntarIA(String pregunta) {
//        AnthropicClient client = AnthropicOkHttpClient.builder()
//                .apiKey(anthropicApiKey)
//                .build();
//
//        MessageCreateParams params = MessageCreateParams.builder()
//                .model(Modelo .CLAUDE_OPUS_4_8)
//                .maxTokens(500L)
//                .system(SYSTEM_PROMPT)
//                .addUserMessage(pregunta)
//                .build();
//
//        Message response = client.messages().create(params);
//
//        String respuesta = response.content().stream()
//                .flatMap(block -> block.text().stream())
//                .map(textBlock -> textBlock.text())
//                .collect(Collectors.joining("\n"))
//                .trim();
//
//        if (respuesta.isEmpty()) {
//            respuesta = "No se pudo obtener una respuesta. Intenta nuevamente.";
//        }
//        if (respuesta.length() > MAX_RESPUESTA) {
//            respuesta = respuesta.substring(0, MAX_RESPUESTA - 3) + "...";
//        }
//
//        // Se guarda la pregunta y la respuesta para reutilizarlas (cache)
//        chatIA registro = new chatIA();
//        registro.setPregunta(pregunta);
//        registro.setRespuesta(respuesta);
//        return cR.save(registro);
//    }
}
