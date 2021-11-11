package com.project.survey.models;

import java.util.LinkedHashMap;

public class SurveyResponses {
    private Long survey_id;
    private Long user_id;
    private LinkedHashMap<Long, String> responses;
    public SurveyResponses(){

    }

    public Long getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(Long survey_id) {
        this.survey_id = survey_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public LinkedHashMap<Long, String> getResponses() {
        return responses;
    }

    public void setResponses(LinkedHashMap<Long, String> responses) {
        this.responses = responses;
    }
}
