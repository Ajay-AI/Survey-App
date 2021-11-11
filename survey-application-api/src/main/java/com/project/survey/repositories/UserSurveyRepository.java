package com.project.survey.repositories;

import com.project.survey.models.UserSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserSurveyRepository extends JpaRepository<UserSurvey, Long> {
    @Query(value = "select * from user_survey us where us.user_id=:id1 and us.survey_id=:id", nativeQuery = true)
    List<UserSurvey> findByUserAndSurvey(Long id, long id1);

    @Query(value = "select us.survey_id from user_survey us where us.user_id=:id", nativeQuery = true)
    List<Long> findAllByUserID(long id);
}