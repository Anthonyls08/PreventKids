package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.UserDTO;
import upc.edu.pe.preventkids.dtos.UserDistrictCountDTO;
import upc.edu.pe.preventkids.dtos.UserRoleCountDTO;
import upc.edu.pe.preventkids.entities.District;
import upc.edu.pe.preventkids.entities.Role;
import upc.edu.pe.preventkids.entities.User;
import upc.edu.pe.preventkids.entities.PhysicalLimitation;
import upc.edu.pe.preventkids.entities.chatIA;
import upc.edu.pe.preventkids.repositories.IChatIARepository;
import upc.edu.pe.preventkids.repositories.IDistrictRRepository;
import upc.edu.pe.preventkids.repositories.IPhysicalLimitationRepository;
import upc.edu.pe.preventkids.repositories.IRoleRepository;
import upc.edu.pe.preventkids.servicesinterfaces.IUserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private IUserService uS;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IRoleRepository rR;
    @Autowired
    private IDistrictRRepository dR;
    @Autowired
    private IPhysicalLimitationRepository plR;
    @Autowired
    private IChatIARepository ciaR;


    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserDTO>> listar() {
        List<UserDTO> listaUsers = uS.list().stream()
                .map(y -> {
                    ModelMapper m = new ModelMapper();
                    m.getConfiguration().setAmbiguityIgnored(true);
                    UserDTO dto = m.map(y, UserDTO.class);
                    dto.setIdDistrict(y.getIdDistrict().getIdDistrict());
                    dto.setIdRole(y.getIdRole().getIdRole());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaUsers);
    }

    @PostMapping("/web")
    public ResponseEntity<?> registrar(@RequestBody UserDTO dto) {
        if (dto.getNombre() == null || dto.getNombre().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre no puede ser nulo");
        }
        if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("El email no puede ser nulo");
        }
        if (dto.getIdRole() == 0) {
            return ResponseEntity.badRequest().body("El usuario debe tener un rol asignado");
        }
        if (dto.getIdDistrict() == 0) {
            return ResponseEntity.badRequest().body("El usuario debe tener un distrito asignado");
        }

        Role role = rR.findById(dto.getIdRole())
                .orElseThrow(() -> new RuntimeException("Role no encontrado con id: " + dto.getIdRole()));

        // El registro público (sin token) solo puede elegir rol PACIENTE o PADRE.
        // Un ADMIN autenticado sí puede crear usuarios con cualquier rol.
        String nombreRol = role.getNombre() == null ? "" : role.getNombre().toUpperCase();
        boolean esRolPublico = nombreRol.equals("PACIENTE") || nombreRol.equals("PADRE");
        if (!esRolPublico) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            boolean esAdmin = auth != null && auth.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ADMIN"));
            if (!esAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Solo puede registrarse con el rol PACIENTE o PADRE");
            }
        }

        District district = dR.findById(dto.getIdDistrict())
                .orElseThrow(() -> new RuntimeException("District no encontrado con id: " + dto.getIdDistrict()));
        PhysicalLimitation physicalLimitation = plR.findById(dto.getIdPhysicalLimitation()).orElse(null);
        chatIA chatia = ciaR.findById(dto.getIdchatIA()).orElse(null);

        ModelMapper m = new ModelMapper();
        m.getConfiguration().setAmbiguityIgnored(true);
        User u = m.map(dto, User.class);
        u.setIdRole(role);
        u.setIdDistrict(district);
        u.setPhysicallimitation(physicalLimitation);
        u.setChatia(chatia);
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        User user = uS.insert(u);

        UserDTO responseDTO = m.map(user, UserDTO.class);
        responseDTO.setIdDistrict(user.getIdDistrict().getIdDistrict());
        responseDTO.setIdRole(user.getIdRole().getIdRole());
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        Optional<User> user = uS.listId(id);

        if (user.isPresent()) {
            ModelMapper m = new ModelMapper();
            m.getConfiguration().setAmbiguityIgnored(true);
            UserDTO dto = m.map(user.get(), UserDTO.class);
            dto.setIdDistrict(user.get().getIdDistrict().getIdDistrict());
            dto.setIdRole(user.get().getIdRole().getIdRole());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado");
        }
    }

    @PutMapping("/actualiza")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizar(@RequestBody UserDTO dto) {
        Optional<User> existente = uS.listId(dto.getIdUser());

        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado");
        }

        if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("El email no puede ser nulo");
        }

        Role role = rR.findById(dto.getIdRole())
                .orElseThrow(() -> new RuntimeException("Role no encontrado con id: " + dto.getIdRole()));
        District district = dR.findById(dto.getIdDistrict())
                .orElseThrow(() -> new RuntimeException("District no encontrado con id: " + dto.getIdDistrict()));
        PhysicalLimitation physicalLimitation = plR.findById(dto.getIdPhysicalLimitation()).orElse(null);
        chatIA chatia = ciaR.findById(dto.getIdchatIA()).orElse(null);

        ModelMapper m = new ModelMapper();
        m.getConfiguration().setAmbiguityIgnored(true);
        User u = m.map(dto, User.class);
        u.setIdUser(existente.get().getIdUser());
        u.setIdRole(role);
        u.setIdDistrict(district);
        u.setPhysicallimitation(physicalLimitation);
        u.setChatia(chatia);

        // Password: si viene vacio se conserva el actual; si viene, se encripta
        // (nunca se guarda en texto plano, para no romper el login con BCrypt).
        if (dto.getPassword() == null || dto.getPassword().isEmpty()) {
            u.setPassword(existente.get().getPassword());
        } else {
            u.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        uS.update(u);

        return ResponseEntity.ok("Usuario actualizado correctamente");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<User> user = uS.listId(id);

        if (user.isPresent()) {
            uS.delete(id);
            return ResponseEntity.ok("Usuario eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado");
        }
    }

    @GetMapping("/conteo-por-rol")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> contarUsuariosPorRol() {
        List<Object[]> resultados = uS.contarUsuariosPorRol();
        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay usuarios registrados");
        }
        List<UserRoleCountDTO> respuesta = new ArrayList<>();
        for (Object[] fila : resultados) {
            UserRoleCountDTO dto = new UserRoleCountDTO();
            dto.setNombreRol((String) fila[0]);
            dto.setCantidadUsuarios(((Number) fila[1]).intValue());
            respuesta.add(dto);
        }
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/conteo-por-distrito")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> contarUsuariosPorDistrito() {
        List<Object[]> resultados = uS.contarUsuariosPorDistrito();
        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay usuarios registrados");
        }
        List<UserDistrictCountDTO> respuesta = new ArrayList<>();
        for (Object[] fila : resultados) {
            UserDistrictCountDTO dto = new UserDistrictCountDTO();
            dto.setNombreDistrito((String) fila[0]);
            dto.setCantidadUsuarios(((Number) fila[1]).intValue());
            respuesta.add(dto);
        }
        return ResponseEntity.ok(respuesta);
    }
}
