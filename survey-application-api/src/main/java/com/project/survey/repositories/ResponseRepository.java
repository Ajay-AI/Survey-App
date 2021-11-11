package com.project.survey.repositories;

import com.project.survey.models.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ResponseRepository extends JpaRepository<Response, Long> {
    @Query(value = "SELECT * FROM responses r where r.survey_id = :survey_id", nativeQuery = true)
    List<Response> findBysurvey_id(Long survey_id);
}
