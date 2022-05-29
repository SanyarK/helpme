package testgr.usergr.dao;

import testgr.usergr.model.User;

import java.util.List;

public interface UserDao {
    List<User> allUsers();
    void add(User user);
    void delete(User user);
    User edit(User user);
    User getById(long id);
}
