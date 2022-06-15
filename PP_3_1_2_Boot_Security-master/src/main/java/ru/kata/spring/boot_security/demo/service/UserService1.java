//package ru.kata.spring.boot_security.demo.service;
//
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import ru.kata.spring.boot_security.demo.model.Role;
//import ru.kata.spring.boot_security.demo.model.User;
//import ru.kata.spring.boot_security.demo.repository.RoleRepository;
//import ru.kata.spring.boot_security.demo.repository.UserRepository;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//
//@Service
//@Transactional
//public class UserService1 implements UserDetailsService {
//    private final RoleRepository roleRepository;
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public UserService1(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        this.roleRepository = roleRepository;
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    public Role getRoleById(Long id) {
//        return entityManager.find(Role.class, id);
//    }
//
//    public Set<Role> getRoles
//    public Set<Role> getAllRoles(Set<String> roles) {
//        return roleRepository.findAll().stream().collect(Collectors.toSet());
//    }
//
//    public List<User> getAllUsersRoles() {
//        return roleRepository.findAll()
//    }
//
//}
