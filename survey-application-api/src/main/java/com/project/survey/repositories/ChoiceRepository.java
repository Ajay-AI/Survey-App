package com.project.survey.repositories;

import com.project.survey.models.Choice;
import com.project.survey.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {
}
