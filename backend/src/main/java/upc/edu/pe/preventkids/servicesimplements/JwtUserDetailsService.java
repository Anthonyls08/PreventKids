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


//Clase 2
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
        roles.add(new SimpleGrantedAuthority(user.getIdRole().getNombre()));

        boolean isEnabled = "Activo".equalsIgnoreCase(user.getEstado());

        UserDetails ud = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                isEnabled,
                true,
                true,
                true,
                roles
        );

        return ud;
    }
}