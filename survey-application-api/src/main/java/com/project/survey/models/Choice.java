package com.project.survey.models;

import javax.persistence.*;

@Entity(name="choices")
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long choice_id;
    private String value;

    public Choice(){
    }

    public Long getChoice_id() {
        return choice_id;
    }

    public void setChoice_id(Long choice_id) {
        this.choice_id = choice_id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
