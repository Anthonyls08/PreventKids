package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.RoleDTO;
import upc.edu.pe.preventkids.entities.Role;
import upc.edu.pe.preventkids.servicesinterfaces.IRoleService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")
public class RoleController {

    // Toda la seguridad (@PreAuthorize, menu por rol) depende del nombre
    // exacto del rol, por eso solo se permiten estos tres.
    private static final List<String> ROLES_PERMITIDOS = List.of("ADMIN", "DOCTOR", "PADRE");

    @Autowired
    private IRoleService rS;

    @GetMapping
    public ResponseEntity<List<RoleDTO>> listar() {
        ModelMapper m = new ModelMapper();
        List<RoleDTO> listaRoles = rS.list().stream()
                .map(y -> m.map(y, RoleDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaRoles);
    }

    @PostMapping("/web")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> registrar(@RequestBody RoleDTO dto) {
        if (dto.getNombre() == null ) {
            return ResponseEntity.badRequest()
                    .body("El nombre del rol no puede ser nulo");
        }
        if (dto.getDescripcion() == null ) {
            return ResponseEntity.badRequest()
                    .body("La descripción no puede ser nula");
        }
        if (!ROLES_PERMITIDOS.contains(dto.getNombre().toUpperCase().trim())) {
            return ResponseEntity.badRequest()
                    .body("Solo se permiten los roles ADMIN, DOCTOR y PADRE");
        }

        ModelMapper m = new ModelMapper();
        Role r = m.map(dto, Role.class);
        Role role = rS.insert(r);
        RoleDTO responseDTO = m.map(role, RoleDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        ModelMapper m = new ModelMapper();
        Optional<Role> role = rS.listId(id);

        if (role.isPresent()) {
            RoleDTO dto = m.map(role.get(), RoleDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Rol no encontrado");
        }
    }

    @PutMapping("/actualiza")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizar(@RequestBody RoleDTO dto) {
        Optional<Role> existente = rS.listId(dto.getIdRole());

        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Rol no encontrado");
        }

        if (dto.getNombre() == null || dto.getNombre().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("El nombre no puede ser nulo");
        }
        if (!ROLES_PERMITIDOS.contains(dto.getNombre().toUpperCase().trim())) {
            return ResponseEntity.badRequest()
                    .body("Solo se permiten los roles ADMIN, DOCTOR y PADRE");
        }

        Role r = existente.get();

        r.setNombre(dto.getNombre());
        r.setDescripcion(dto.getDescripcion());

        rS.update(r);

        return ResponseEntity.ok("Rol actualizado correctamente");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<Role> role = rS.listId(id);

        if (role.isPresent()) {
            try {
                rS.delete(id);
            } catch (DataIntegrityViolationException e) {
                return ResponseEntity.badRequest()
                        .body("No se puede eliminar un rol que tiene usuarios asignados");
            }
            return ResponseEntity.ok("Rol eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Rol no encontrado");
        }
    }

}
