package com.project.survey.models;

import javax.persistence.*;

@Entity(name="responses")
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long response_id;
    private Long survey_id;
    private Long user_id;
    private Long question_id;
    private String response;

    public Response(){
    }

    public Long getResponse_id() {
        return response_id;
    }

    public void setResponse_id(Long response_id) {
        this.response_id = response_id;
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

    public Long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Long question_id) {
        this.question_id = question_id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
