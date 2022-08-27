package com.utticus.blogloo.jpa;

import com.utticus.blogloo.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonSprintDataRepository extends JpaRepository<Person, Integer> {

}
