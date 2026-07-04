package upc.edu.pe.preventkids.servicesimplements;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import upc.edu.pe.preventkids.entities.chatIA;
import upc.edu.pe.preventkids.repositories.IChatIARepository;
import upc.edu.pe.preventkids.servicesinterfaces.IChatIAService;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ChatiAServiceImplement implements IChatIAService {
    @Autowired
    private IChatIARepository cR;

    // API key gratuita de Google AI Studio (https://aistudio.google.com/apikey)
    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${gemini.api.model:gemini-2.5-flash}")
    private String geminiModel;

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent";

    // Umbral de similitud (0 a 1): si una pregunta guardada se parece al menos
    // en este porcentaje, se reutiliza su respuesta en vez de llamar a la API.
    private static final double UMBRAL_SIMILITUD = 0.6;

    // La columna respuesta de la tabla chatIA admite 300 caracteres
    private static final int MAX_RESPUESTA = 300;

    private static final String SYSTEM_PROMPT =
            "Eres el asistente de salud de PreventKids, una aplicacion de prevencion " +
            "de salud infantil (nutricion, ejercicio, habitos saludables y bienestar de ninos). " +
            "Responde siempre en espanol, de forma clara y amable para padres y pacientes. " +
            "Responde en texto plano, en un solo parrafo, sin markdown, sin asteriscos y sin listas. " +
            "Tu respuesta debe tener como maximo 250 caracteres. " +
            "Da siempre primero un consejo practico y concreto basado en recomendaciones " +
            "generales de salud infantil; nunca respondas unicamente que consulten al medico. " +
            "Despues del consejo, si el tema lo amerita, agrega que pueden confirmarlo con un especialista. " +
            "Solo ante una emergencia o sintomas graves prioriza la atencion medica inmediata. " +
            "No des diagnosticos definitivos ni recomiendes medicamentos con dosis.";

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

    // ===== Llamada a la API de Gemini (capa gratuita de Google AI Studio) =====

    @Override
    public chatIA preguntarIA(String pregunta) {
        if (geminiApiKey == null || geminiApiKey.trim().isEmpty()) {
            // Sin API key: el controller responde el mensaje de respaldo.
            // Si la variable GEMINI_API_KEY existe pero igual sale este mensaje,
            // reiniciar el IDE/terminal (los procesos abiertos no ven variables nuevas).
            System.err.println("[ChatIA] GEMINI_API_KEY no configurada: se responde el mensaje de respaldo");
            return null;
        }
        try {
            ObjectMapper mapper = new ObjectMapper();

            // Cuerpo de la peticion segun la API REST de Gemini (generateContent)
            ObjectNode body = mapper.createObjectNode();
            body.putObject("system_instruction")
                    .putArray("parts").addObject().put("text", SYSTEM_PROMPT);
            body.putArray("contents").addObject()
                    .putArray("parts").addObject().put("text", pregunta);
            ObjectNode generationConfig = body.putObject("generationConfig");
            generationConfig.put("maxOutputTokens", 1024);
            // Sin "razonamiento" interno: respuesta directa y mas rapida
            generationConfig.putObject("thinkingConfig").put("thinkingBudget", 0);

            String url = String.format(GEMINI_URL, geminiModel);
            String json = RestClient.create().post()
                    .uri(url)
                    .header("x-goog-api-key", geminiApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(mapper.writeValueAsString(body))
                    .retrieve()
                    .body(String.class);

            JsonNode root = mapper.readTree(json);
            String respuesta = root.path("candidates").path(0).path("content")
                    .path("parts").path(0).path("text").asText("").trim();

            if (respuesta.isEmpty()) {
                return null;
            }
            respuesta = recortarEnOracion(respuesta);

            // Se guarda la pregunta y la respuesta para reutilizarlas (cache)
            chatIA registro = new chatIA();
            registro.setPregunta(pregunta);
            registro.setRespuesta(respuesta);
            return cR.save(registro);
        } catch (Exception e) {
            // Sin internet, key invalida o limite diario agotado
            System.err.println("[ChatIA] Error llamando a Gemini: " + e.getMessage());
            return null;
        }
    }

    // Si el texto supera el limite de la columna (300), corta en la ultima
    // oracion completa para no dejar frases a medias; si no hay punto,
    // corta en el ultimo espacio y agrega puntos suspensivos
    private String recortarEnOracion(String texto) {
        if (texto.length() <= MAX_RESPUESTA) {
            return texto;
        }
        String corte = texto.substring(0, MAX_RESPUESTA);
        int ultimaOracion = Math.max(corte.lastIndexOf('.'),
                Math.max(corte.lastIndexOf('!'), corte.lastIndexOf('?')));
        if (ultimaOracion >= 100) {
            return corte.substring(0, ultimaOracion + 1);
        }
        return corte.substring(0, corte.lastIndexOf(' ')) + "...";
    }
}
