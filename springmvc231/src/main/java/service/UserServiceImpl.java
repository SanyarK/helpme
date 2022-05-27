package service;

import dao.UserDao;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional
    @Override
    public void add(User user) {
        userDao.add(user);
    }

    @Transactional
    @Override
    public List<User> listUsers() {
        return userDao.listUsers();
    }

    @Transactional
    @Override
    public User getUserFrom(String name, String surname, String email) {
//        try (Session session = userDao.getSession()) {
//            String HQL = "FROM Car car WHERE car.model=:model_car and  car.series=:series_car";
//            Car car = session.createQuery(HQL, Car.class)
//                    .setParameter("model_car", model)
//                    .setParameter("series_car", series)
//                    .getSingleResult();
//            System.out.println(car.getCarOwner());
//            return car.getCarOwner();
//        }
//   }
        return null;
    }

    private static final List<User> userList = new ArrayList<>();

    static {
        userList.add(new User("John1", "Karnegi1", "JK1@mail.ru"));
        userList.add(new User("John2", "Karnegi2", "JK2@mail.ru"));
        userList.add(new User("John3", "Karnegi3", "JK3@mail.ru"));
        userList.add(new User("John4", "Karnegi4", "JK4@mail.ru"));
        userList.add(new User("John5", "Karnegi5", "JK5@mail.ru"));
    }

    public List<User> getUsers(int count) {
        if (count == 0) {
            return userList;
        } else {
            return userList.stream().limit(count).collect(Collectors.toList());
        }
    }
}
