package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.UserDTO;
import upc.edu.pe.preventkids.dtos.UserRoleCountDTO;
import upc.edu.pe.preventkids.entities.User;
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

    @GetMapping
    public ResponseEntity<List<UserDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<UserDTO> listaUsers = uS.list().stream()
                .map(y -> m.map(y, UserDTO.class))
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
        if (dto.getIdRole() == null) {
            return ResponseEntity.badRequest().body("El usuario debe tener un rol asignado");
        }

        ModelMapper m = new ModelMapper();
        User u = m.map(dto, User.class);
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        User user = uS.insert(u);
        UserDTO responseDTO = m.map(user, UserDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<User> user = uS.listId(id);

        if (user.isPresent()) {
            UserDTO dto = m.map(user.get(), UserDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado");
        }
    }

    @PutMapping("/actualiza")
    public ResponseEntity<String> actualizar(@RequestBody UserDTO dto) {
        Optional<User> existente = uS.listId(dto.getIdUser());

        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado");
        }

        if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("El email no puede ser nulo");
        }

        ModelMapper m = new ModelMapper();
        User u = m.map(dto, User.class);
        u.setIdUser(existente.get().getIdUser());

        uS.update(u);

        return ResponseEntity.ok("Usuario actualizado correctamente");
    }

    @DeleteMapping("/{id}")
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
}
