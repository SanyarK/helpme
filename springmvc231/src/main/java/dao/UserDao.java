package dao;

import model.User;

import javax.persistence.EntityManager;
import java.util.List;

public interface UserDao {
    EntityManager getEntityManager();
    void saveUser();
    List<User> listUsers();
    public void removeUser();
    public User getUser(Long userId);
    public void mergeUser();
    public List queryForMovies();

    void add(User user);
}
