package com.project.survey.models;

import javax.persistence.*;

@Entity(name="survey_criteria")
public class SurveyCriteria {
    @Id
    private Long survey_id;
    private Long min_age;
    private Long max_age;
    private String city;

    public SurveyCriteria(){

    }
    public Long getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(Long survey_id) {
        this.survey_id = survey_id;
    }

    public Long getMin_age() {
        return min_age;
    }

    public void setMin_age(Long min_age) {
        this.min_age = min_age;
    }

    public Long getMax_age() {
        return max_age;
    }

    public void setMax_age(Long max_age) {
        this.max_age = max_age;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
