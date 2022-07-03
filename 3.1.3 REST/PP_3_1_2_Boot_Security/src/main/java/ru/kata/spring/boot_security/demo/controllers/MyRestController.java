package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.Exception.NoSuchUserException;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MyRestController {

    private UserService userService;

    @Autowired
    public MyRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/principal")
    public User getPrincipalInfo(Principal principal) {
        return userService.findByName(principal.getName());
    }

    @GetMapping("/roles")
    public Iterable<Role> getRoles() {
        return userService.getRoles();
    }

    @GetMapping("/rest")
    public ResponseEntity<List<User>> userList() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/rest/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUser(id);

        if(user == null) {
            throw new NoSuchUserException("братуха, такого юзера по айди = " + id + " нетУУ");
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/rest")
    public User addNewUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @PutMapping("/rest")
    public User editUser(@RequestBody User user) {
        userService.updateUser(user);
        return user;
    }

    @DeleteMapping("rest/{id}")
    public String deleteUser(@PathVariable Long id) {
        User user = userService.getUser(id);
        if (user == null) {
            throw new NoSuchUserException("братуха, такого юзера в безе нет по айди "+ id);
        }
        userService.deleteUser(id);
        return "удалил юзера под номером " + id;
    }
}
