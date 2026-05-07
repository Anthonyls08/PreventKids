package upc.edu.pe.preventkids.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import upc.edu.pe.preventkids.entities.User;
import upc.edu.pe.preventkids.repositories.IUserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private IUserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repo.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("Usuario no existe con email: %s", email));
        }

        List<GrantedAuthority> roles = new ArrayList<>();
        String roleName = user.getIdRole().getNombre();
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName;
        }
        roles.add(new SimpleGrantedAuthority(roleName));

        boolean isEnabled = user.getEstado() != null && user.getEstado().equalsIgnoreCase("ACTIVO");

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                isEnabled,
                true,
                true,
                true,
                roles
        );
    }
}