package upc.edu.pe.preventkids.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.preventkids.dtos.AlertDTO;
import upc.edu.pe.preventkids.entities.Alert;
import upc.edu.pe.preventkids.servicesinterfaces.IAlertService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alerta")
public class AlertController {
    @Autowired
    private IAlertService aS;
    // El PADRE solo ve las alertas de SUS hijos; doctor y admin ven todas
    @GetMapping("/listar")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<List<AlertDTO>> listar(Authentication auth){
        ModelMapper m=new ModelMapper();
        List<AlertDTO> listaAlert=aS.list().stream()
                .filter(y -> !esPadre(auth) || esDeSuHijo(y, auth))
                .map(y->m.map(y,AlertDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaAlert);
    }
    @PostMapping("/ingresar")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> registrar(@RequestBody AlertDTO dto){
        ModelMapper m=new ModelMapper();
        Alert c=m.map(dto, Alert.class);
        Alert alerta= aS.insert(c);
        AlertDTO responseDTO=m.map(alerta,AlertDTO.class);
        return  ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('PADRE') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> buscarPorId(@PathVariable int id, Authentication auth) {
        ModelMapper m = new ModelMapper();
        Optional<Alert> alerta = aS.listId(id);

        if (alerta.isPresent()) {
            if (esPadre(auth) && !esDeSuHijo(alerta.get(), auth)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Solo puede ver las alertas de sus propios hijos");
            }
            AlertDTO dto = m.map(alerta.get(), AlertDTO.class);
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alerta no encontrado");
        }
    }
    @PutMapping("/actualizar")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizar(@RequestBody AlertDTO dto) {

        Optional<Alert> existente = aS.listId(dto.getIdAlert());
        if (existente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alerta no encontrado");
        }

        Alert a = existente.get();

        a.setLeida(dto.isLeida());
        a.setGenerationdate(dto.getGenerationdate());
        a.setTipoalert(dto.getTipoalert());
        a.setMedicion(dto.getMedicion());

        aS.update(a);
        return ResponseEntity.ok("Alerta actualizado correctamente");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminar(@PathVariable int id) {
        Optional<Alert> alerta = aS.listId(id);

        if (alerta.isPresent()) {
            aS.delete(id);
            return ResponseEntity.ok("Alerta eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alerta no encontrado");
        }
    }
    // Panel clinico de alertas criticas sin leer: solo doctor y admin
    @GetMapping("/criticas")
    @PreAuthorize("hasAuthority('DOCTOR') OR hasAuthority('ADMIN')")
    public ResponseEntity<?> obtenerAlertasCriticas(
            @RequestParam(required = false, defaultValue = "3") Integer umbralRiesgo) {
        if (umbralRiesgo < 1 || umbralRiesgo > 5) {
            return ResponseEntity.badRequest()
                    .body("Error: El umbral de riesgo debe estar entre 1 y 5.");
        }
        ModelMapper m = new ModelMapper();
        List<AlertDTO> alertasCriticas = aS.obtenerAlertasNoLeidasCriticas(umbralRiesgo)
                .stream()
                .map(y -> m.map(y, AlertDTO.class))
                .collect(Collectors.toList());
        if (alertasCriticas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(alertasCriticas);
    }

    // El autenticado tiene rol PADRE (no ADMIN ni DOCTOR)
    private boolean esPadre(Authentication auth) {
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("PADRE"));
    }

    // La alerta corresponde a una medicion de un hijo del padre autenticado
    private boolean esDeSuHijo(Alert alerta, Authentication auth) {
        return alerta.getMedicion() != null && alerta.getMedicion().getHijo() != null
                && alerta.getMedicion().getHijo().getUser() != null
                && auth.getName().equals(alerta.getMedicion().getHijo().getUser().getEmail());
    }
}
