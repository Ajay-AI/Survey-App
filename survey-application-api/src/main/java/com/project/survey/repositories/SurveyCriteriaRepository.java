package com.project.survey.repositories;

import com.project.survey.models.SurveyCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SurveyCriteriaRepository extends JpaRepository<SurveyCriteria, Long> {
    @Query(value="select s.survey_id from survey_criteria s where :age between s.min_age and s.max_age and :city like s.city")
    List<Long> findSurveybyCriteria(Long age, String city);
}