package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.HijoDTO;
import upc.edu.pe.preventkids.dtos.HijoInsertDTO;
import upc.edu.pe.preventkids.entities.Hijo;
import upc.edu.pe.preventkids.entities.PhysicalLimitation;
import upc.edu.pe.preventkids.entities.User;
import upc.edu.pe.preventkids.repositories.IPhysicalLimitationRepository;
import upc.edu.pe.preventkids.repositories.IUserRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IHijoService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/hijos")
public class HijoController {
    @Autowired
    private IHijoService hS;
    @Autowired
    private IUserRepository uR;
    @Autowired
    private IPhysicalLimitationRepository plR;

    // Todos los hijos registrados (para el doctor y el admin)
    @GetMapping("/listar")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<List<HijoDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<HijoDTO> lista = hS.list().stream()
                .map(y -> m.map(y, HijoDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }

    // Los hijos del padre autenticado (el email viene del token JWT)
    @GetMapping("/mis-hijos")
    @PreAuthorize("hasAuthority('PADRE')")
    public ResponseEntity<List<HijoDTO>> misHijos(Authentication auth) {
        ModelMapper m = new ModelMapper();
        List<HijoDTO> lista = hS.listarPorPadre(auth.getName()).stream()
                .map(y -> m.map(y, HijoDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('PADRE') OR hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> buscarPorId(@PathVariable int id, Authentication auth) {
        Optional<Hijo> hijo = hS.listId(id);
        if (hijo.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hijo no encontrado");
        }
        if (esPadre(auth) && !esDueno(hijo.get(), auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Solo puede ver a sus propios hijos");
        }
        ModelMapper m = new ModelMapper();
        return ResponseEntity.ok(m.map(hijo.get(), HijoDTO.class));
    }

    @PostMapping("/registrar")
    @PreAuthorize("hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> registrar(@RequestBody HijoInsertDTO dto, Authentication auth) {
        if (dto.getNombre() == null || dto.getNombre().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre no puede ser nulo");
        }
        if (dto.getApellido() == null || dto.getApellido().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El apellido no puede ser nulo");
        }
        if (dto.getFechanacimiento() == null) {
            return ResponseEntity.badRequest().body("La fecha de nacimiento no puede ser nula");
        }
        if (dto.getFechanacimiento().isAfter(LocalDate.now())) {
            return ResponseEntity.badRequest().body("La fecha de nacimiento no puede ser futura");
        }
        if (dto.getGenero() == null || dto.getGenero().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El género no puede ser nulo");
        }

        // El padre autenticado registra a sus propios hijos; el admin debe
        // indicar a qué padre pertenece el hijo (idUser)
        User padre;
        if (esPadre(auth)) {
            padre = uR.findByEmail(auth.getName());
            if (padre == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Padre no encontrado");
            }
        } else {
            if (dto.getIdUser() == 0) {
                return ResponseEntity.badRequest().body("Debe indicar el padre del hijo (idUser)");
            }
            Optional<User> user = uR.findById(dto.getIdUser());
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Padre no encontrado");
            }
            padre = user.get();
        }

        PhysicalLimitation limitacion = plR.findById(dto.getIdPhysicalLimitation()).orElse(null);

        Hijo h = new Hijo();
        h.setNombre(dto.getNombre().trim());
        h.setApellido(dto.getApellido().trim());
        h.setFechanacimiento(dto.getFechanacimiento());
        h.setGenero(dto.getGenero().trim());
        h.setUser(padre);
        h.setPhysicallimitation(limitacion);
        Hijo hijo = hS.insert(h);

        ModelMapper m = new ModelMapper();
        return ResponseEntity.status(HttpStatus.CREATED).body(m.map(hijo, HijoDTO.class));
    }

    @PutMapping("/actualizar")
    @PreAuthorize("hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> actualizar(@RequestBody HijoInsertDTO dto, Authentication auth) {
        Optional<Hijo> existente = hS.listId(dto.getIdHijo());
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hijo no encontrado");
        }
        if (esPadre(auth) && !esDueno(existente.get(), auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Solo puede modificar a sus propios hijos");
        }
        if (dto.getFechanacimiento() != null && dto.getFechanacimiento().isAfter(LocalDate.now())) {
            return ResponseEntity.badRequest().body("La fecha de nacimiento no puede ser futura");
        }

        Hijo h = existente.get();
        if (dto.getNombre() != null && !dto.getNombre().trim().isEmpty()) {
            h.setNombre(dto.getNombre().trim());
        }
        if (dto.getApellido() != null && !dto.getApellido().trim().isEmpty()) {
            h.setApellido(dto.getApellido().trim());
        }
        if (dto.getFechanacimiento() != null) {
            h.setFechanacimiento(dto.getFechanacimiento());
        }
        if (dto.getGenero() != null && !dto.getGenero().trim().isEmpty()) {
            h.setGenero(dto.getGenero().trim());
        }
        h.setPhysicallimitation(plR.findById(dto.getIdPhysicalLimitation()).orElse(null));

        hS.update(h);
        return ResponseEntity.ok("Hijo actualizado correctamente");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable int id, Authentication auth) {
        Optional<Hijo> hijo = hS.listId(id);
        if (hijo.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hijo no encontrado");
        }
        if (esPadre(auth) && !esDueno(hijo.get(), auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Solo puede eliminar a sus propios hijos");
        }
        try {
            hS.delete(id);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body("No se puede eliminar un hijo que tiene mediciones registradas");
        }
        return ResponseEntity.ok("Hijo eliminado correctamente");
    }

    // El autenticado tiene rol PADRE (no ADMIN ni DOCTOR)
    private boolean esPadre(Authentication auth) {
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("PADRE"));
    }

    // El hijo pertenece al padre autenticado
    private boolean esDueno(Hijo hijo, Authentication auth) {
        return hijo.getUser() != null && auth.getName().equals(hijo.getUser().getEmail());
    }
}
