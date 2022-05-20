package hiber.service;

import com.mysql.cj.xdevapi.Statement;
import hiber.dao.UserDao;
import hiber.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class UserServiceImp implements UserService {

   @Autowired
   private UserDao userDao;

   @Transactional
   @Override
   public void add(User user) {
      userDao.add(user);
   }

   @Transactional(readOnly = true)
   @Override
   public List<User> listUsers() {
      return userDao.listUsers();
   }

   public void UserCar(String table) throws SQLException, ClassNotFoundException {
      String sql = "SELECT user FROM users where id";

      Statement statement = getDbConnection().createStatement();
      ResultSet res = statement.executeQuery(sql);

      System.out.println("Все пользователи с машиной");
      while (res.next()) {
         System.out.println(res.getString("login")  +  " - "  +  res.getString("title"));
      }

   }

}
