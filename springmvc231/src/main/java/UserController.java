import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import service.UserService;

import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/users")
    String modelCar(@RequestParam(value = "count", required = false) Optional<Integer> count, Model model) {
        model.addAttribute("users", userService.getUsers(count.orElse(0)));
        return "users";
    }
}
