package dao;

import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    private EntityManagerFactory entityManagerFactory;

    @Autowired
    public UserDaoImpl(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    EntityManagerFactory emf = Persistence.createEntityManagerFactory("tables");

    @Override
    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    EntityManager em;

    @Override
    @SuppressWarnings("unchecked")
    public List<User> listUsers() {
        Query query = emf.createEntityManager().createQuery("from User");
        return query.getResultList();
    }

    @Override
    public void saveUser() { // coxranenie
        EntityManager em = getEntityManager();

        em.getTransaction().begin();

        User user = new User();
        user.setId(1L);
        user.setName("Flakon");
        user.setSurname("Jakupov");
        user.setEmail("akupov671@gmail.com");

        em.persist(user);
        em.getTransaction().commit();
    }

    @Override
    public void removeUser() {  //удаляет
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        User movie = em.find(User.class, new Long(1L));
        em.remove(movie);
        em.getTransaction().commit();
    }

    @Override
    public User getUser(Long userId) { // извлечение объекта из базы данных
        EntityManager em = getEntityManager();
        User user = em.find(User.class, new Long(userId));
        em.detach(user);
        return user;
    }

    @Override
    public void mergeUser() { //внести изменения, внесенные в отдельный объект
        EntityManager em = getEntityManager();
        User user = getUser(1L);
        em.detach(user);
        user.setEmail("akupov671@gmail.com");
        em.getTransaction().begin();
        em.merge(user);
        em.getTransaction().commit();
    }

    @Override
    public List queryForMovies() { //для запроса сущностей.
        EntityManager em = getEntityManager();
        List user = em.createQuery("SELECT user from User user where user.email = ?1")
                .setParameter(1, "akupov671@gmail.com")
                .getResultList();
        return user;
    }

    @Override
    public void add(User user) {

    }


}
