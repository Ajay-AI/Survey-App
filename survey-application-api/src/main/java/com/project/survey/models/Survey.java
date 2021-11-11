package com.project.survey.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="surveys")
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long survey_id;
    private String survey_name;
    private String survey_status;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="survey_id", referencedColumnName = "survey_id")
    private List<Page> pages = new ArrayList<Page>();
    public Survey() {
    }

    public String getSurvey_status() {
        return survey_status;
    }

    public void setSurvey_status(String survey_status) {
        this.survey_status = survey_status;
    }

    public List<Page> getPages() {
        return pages;
    }

    public void setPages(List<Page> pages) {
        this.pages.clear();
        this.pages.addAll(pages);
    }

    public Long getSurveyID() {
        return survey_id;
    }

    public void setSurveyID(Long survey_id) {
        this.survey_id = survey_id;
    }

    public String getSurveyName() {
        return survey_name;
    }

    public void setSurveyName(String survey_name) {
        this.survey_name = survey_name;
    }
}
