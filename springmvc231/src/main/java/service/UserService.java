package service;

import model.User;

import java.util.List;

public interface UserService {
    void add(User user);
    List<User> listUsers();

    User getUserFrom(String name, String surname, String email);

    default List<User> getUsers(int count) {
        return null;
    }
}
