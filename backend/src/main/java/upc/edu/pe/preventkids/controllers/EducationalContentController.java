package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.EducationalContentDTO;
import upc.edu.pe.preventkids.dtos.EducationalContentInsertDTO;
import upc.edu.pe.preventkids.entities.ProfessionalProfile;
import upc.edu.pe.preventkids.entities.TipoContenido;
import upc.edu.pe.preventkids.entities.educationalContent;
import upc.edu.pe.preventkids.repositories.IProfessionalProfileRepository;
import upc.edu.pe.preventkids.repositories.ITipoContenidoRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IEducationalContentService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/contenido-educativo")
public class EducationalContentController {
    @Autowired
    private IEducationalContentService eS;
    @Autowired
    private IProfessionalProfileRepository ppR;
    @Autowired
    private ITipoContenidoRepository tcR;

    @GetMapping("/listar")
    public ResponseEntity<List<EducationalContentDTO>> listarEC(){
        ModelMapper m = new ModelMapper();
        List<EducationalContentDTO> listaEC = eS.list().stream()
                .map(y->m.map(y, EducationalContentDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaEC);

    }
    @PostMapping("/registrar")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> registrar(@RequestBody EducationalContentInsertDTO dto){
        if (dto.getIdProfessionalProfile() == 0) {
            return ResponseEntity.badRequest().body("El perfil profesional (FK) es obligatorio");
        }
        if (dto.getIdTipocontenido() == 0) {
            return ResponseEntity.badRequest().body("El tipo de contenido (FK) es obligatorio");
        }

        ProfessionalProfile pp = ppR.findById(dto.getIdProfessionalProfile())
                .orElseThrow(() -> new RuntimeException("ProfessionalProfile no encontrado con id: " + dto.getIdProfessionalProfile()));
        TipoContenido tc = tcR.findById(dto.getIdTipocontenido())
                .orElseThrow(() -> new RuntimeException("TipoContenido no encontrado con id: " + dto.getIdTipocontenido()));

        ModelMapper m = new ModelMapper();
        m.getConfiguration().setAmbiguityIgnored(true);
        educationalContent e = m.map(dto, educationalContent.class);
        e.setProfessionalProfile(pp);
        e.setTypeContent(tc);
        educationalContent eduContent = eS.insert(e);

        EducationalContentInsertDTO responseDTO = m.map(eduContent, EducationalContentInsertDTO.class);
        responseDTO.setIdProfessionalProfile(eduContent.getProfessionalProfile().getIdProfessionalProfile());
        responseDTO.setIdTipocontenido(eduContent.getTypeContent().getIdTipocontenido());
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id){
        ModelMapper m = new ModelMapper();
        Optional<educationalContent> eduContent = eS.listId(id);

        if (eduContent.isPresent()){
            educationalContent ec = eduContent.get();
            EducationalContentInsertDTO dto = m.map(ec, EducationalContentInsertDTO.class);
            if (ec.getProfessionalProfile() != null) {
                dto.setIdProfessionalProfile(ec.getProfessionalProfile().getIdProfessionalProfile());
            }
            if (ec.getTypeContent() != null) {
                dto.setIdTipocontenido(ec.getTypeContent().getIdTipocontenido());
            }
            return  ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No encontrado");
        }
    }

    @PutMapping("/actualizar")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizar(@RequestBody EducationalContentInsertDTO dto) {

        Optional<educationalContent> existente = null;
        try {
            existente = eS.listId(dto.getIdEducationalContent());
            if (existente.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No encontrado");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        if (dto.getIdProfessionalProfile() == 0) {
            return ResponseEntity.badRequest().body("El perfil profesional (FK) es obligatorio");
        }
        if (dto.getIdTipocontenido() == 0) {
            return ResponseEntity.badRequest().body("El tipo de contenido (FK) es obligatorio");
        }

        ProfessionalProfile pp = ppR.findById(dto.getIdProfessionalProfile())
                .orElseThrow(() -> new RuntimeException("ProfessionalProfile no encontrado con id: " + dto.getIdProfessionalProfile()));
        TipoContenido tc = tcR.findById(dto.getIdTipocontenido())
                .orElseThrow(() -> new RuntimeException("TipoContenido no encontrado con id: " + dto.getIdTipocontenido()));

        educationalContent e = existente.get();

        e.setTittleEducationalContent(dto.getTittleEducationalContent());
        e.setDescriptionEC(dto.getDescriptionEC());
        e.setUrlContent(dto.getUrlContent());
        e.setTypeEC(dto.getTypeEC());
        e.setProfessionalProfile(pp);
        e.setTypeContent(tc);

        eS.update(e);

        return ResponseEntity.ok("Actualizado correctamente");
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<educationalContent> eduContent = eS.listId(id);

        if (eduContent.isPresent()) {
            eS.delete(id);
            return ResponseEntity.ok("Eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No encontrado");
        }
    }

    @GetMapping("/buscartipo")
    public ResponseEntity<?> buscar(@RequestParam String tipo) {

        if (tipo == null || tipo.trim().isEmpty()) {
            throw new IllegalArgumentException("El tipo de contenido es obligatorio.");
        }

        if (tipo.length() < 3) {
            throw new IllegalArgumentException("El tipo debe tener al menos 3 caracteres.");
        }

        ModelMapper m = new ModelMapper();
        List<EducationalContentDTO> lista = eS.buscarPorTipo(tipo).stream()
                .map(y -> m.map(y, EducationalContentDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }
}
