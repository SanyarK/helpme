package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@Controller
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String findAll(Model model) {
        List<User> users = userService.allUsers();
        model.addAttribute("t_user", users);
        return "admin";
    }

    @GetMapping("/user-create")
    public String createUserForm(){
        return "user-create";
    }

    @PostMapping("/user-create")
    public String createUser(User user) { //, @RequestParam(value = "t_roleId") String[] roles
      //  user.setRoles(userService.getAllRoles(roles));
        userService.saveUser(user);
        return "redirect:/admin";
    }


    @GetMapping("user-delete/{id}")
    public String deleteUser(@PathVariable("id") Long id){
        userService.deleteById(id);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/user-update")
    public String updateUserForm(@PathVariable("id") Long id, Model model){
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "/user-update";
    }

    @PostMapping("/user-update")
    public String updateUser(User user){
        userService.saveUser(user);
        return "redirect:/admin";
    }
}