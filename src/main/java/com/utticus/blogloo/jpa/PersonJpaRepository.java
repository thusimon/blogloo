package com.utticus.blogloo.jpa;

import com.utticus.blogloo.entity.Person;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class PersonJpaRepository {
    @PersistenceContext
    EntityManager entityManager;

    public Person findById(int id) {
        return entityManager.find(Person.class, id);
    }

    public Person insert(Person person) {
        return entityManager.merge(person);
    }

    public void deleteById(int id) {
        Person person = findById(id);
        entityManager.remove(person);
    }

    public List<Person> findAll() {
        Query query = entityManager.createQuery("SELECT p FROM Person p");
        return query.getResultList();
    }
}
