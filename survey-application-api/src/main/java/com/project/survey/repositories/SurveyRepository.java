package com.project.survey.repositories;

import com.project.survey.models.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    @Query(value="select * from surveys s where s.survey_status!='SAVED'", nativeQuery = true)
    List<Survey> findAllBySurveyStatus();

    @Query(value="select * from surveys s where s.survey_status!='SAVED' and s.survey_id in :ids", nativeQuery = true)
    List<Survey> findAllBySurveyStatusAndUserID(List<Long> ids);


}
