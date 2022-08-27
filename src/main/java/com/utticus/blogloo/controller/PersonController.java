package com.utticus.blogloo.controller;

import com.utticus.blogloo.aop.TrackTime;
import com.utticus.blogloo.entity.Person;
import com.utticus.blogloo.jdbc.PersonJdbcDao;
import com.utticus.blogloo.jpa.PersonJpaRepository;
import com.utticus.blogloo.jpa.PersonSprintDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/person")
public class PersonController {
    @Autowired
    PersonJdbcDao personJdbcDao;

    @Autowired
    PersonJpaRepository personJpaRepository;

    @Autowired
    PersonSprintDataRepository personSprintDataRepository;

    @TrackTime
    @RequestMapping(value = "/all", method= RequestMethod.GET)
    List<Person> getAllPersons() {
        return personJdbcDao.findAll();
    }

    @TrackTime
    @RequestMapping(value = "/alljpa", method= RequestMethod.GET)
    List<Person> getAllPersonsJpa() {
        return personJpaRepository.findAll();
    }

    @TrackTime
    @RequestMapping(value = "/id/{id}", method= RequestMethod.GET)
    Person getPersonById(@PathVariable("id") int id) {
        return personJdbcDao.findById(id);
    }

    @TrackTime
    @RequestMapping(value = "/idjpa/{id}", method= RequestMethod.GET)
    Person getPersonByIdJPA(@PathVariable("id") int id) {
        return personJpaRepository.findById(id);
    }

    @TrackTime
    @RequestMapping(value = "/idspringdata/{id}", method= RequestMethod.GET)
    Optional<Person> getPersonByIdSpringData(@PathVariable("id") int id) {
        return personSprintDataRepository.findById(id);
    }

    @TrackTime
    @RequestMapping(value = "/id/{id}", method= RequestMethod.DELETE)
    int deletePersonById(@PathVariable("id") int id) {
        return personJdbcDao.deleteById(id);
    }
}
