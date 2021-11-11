package com.project.survey.repositories;

import com.project.survey.models.DAOUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<DAOUser, Long> {
    DAOUser findByUsername(String username);
    @Query(value="select * from user u where (u.age between :min_age and :max_age) and u.city like :location", nativeQuery = true)
    List<DAOUser> findByCriteria(Long min_age, Long max_age, String location);

    @Query(value = "Select distinct us.city from user us", nativeQuery = true)
    List<String> findDistinctLocations();
}