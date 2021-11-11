package com.project.survey.models;

import javax.persistence.*;

@Entity(name="user_survey")
public class UserSurvey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String survey_status;
    private Long user_id;
    private Long survey_id;

    public UserSurvey(){

    }

    public String getSurvey_status() {
        return survey_status;
    }

    public void setSurvey_status(String survey_status) {
        this.survey_status = survey_status;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(Long survey_id) {
        this.survey_id = survey_id;
    }
}
