package com.project.survey.controllers;

import com.project.survey.models.*;
import com.project.survey.repositories.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/")
public class SurveyController {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ChoiceRepository choiceRepository;

    @Autowired
    private ResponseRepository responseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSurveyRepository userSurveyRepository;

    @Autowired
    private SurveyCriteriaRepository surveyCriteriaRepository;

    @GetMapping
    @RequestMapping("survey/{id}")
    public Survey get(@PathVariable Long id) {
        return surveyRepository.findById(id).get();
    }

    @GetMapping
    @RequestMapping("survey")
    public List<Survey> list(Principal principal) {
        DAOUser user = userRepository.findByUsername(principal.getName());
        if(user.getRole().equals("ROLE_ADMIN")){
            return surveyRepository.findAll();
        }
        List<Long> ids = userSurveyRepository.findAllByUserID(user.getId());
        if(ids.isEmpty()){
            return Collections.<Survey>emptyList();
        }
        return surveyRepository.findAllBySurveyStatusAndUserID(ids);
    }

    @GetMapping
    @RequestMapping("surveyResults/{id}")
    public List<Response> displayResponses(@PathVariable Long id) {
        return responseRepository.findBysurvey_id(id);
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public Long addSurvey(@RequestBody Survey survey){
        Survey mySurvey = surveyRepository.save(survey);
        surveyRepository.flush();

        return mySurvey.getSurveyID();
    }

    @RequestMapping(value = "page", method = RequestMethod.POST)
    public Long addPage(@RequestBody Page page){
        Page myPage = pageRepository.save(page);
        pageRepository.flush();
        return myPage.getPage_id();
    }

    @RequestMapping(value = "question", method = RequestMethod.POST)
    public Long addQuestion(@RequestBody Question question){
        Question myQuestion = questionRepository.save(question);
        questionRepository.flush();
        return myQuestion.getQuestion_id();
    }

    @RequestMapping(value = "choice", method = RequestMethod.POST)
    public Long addChoice(@RequestBody Choice choice){
        Choice myChoice = choiceRepository.save(choice);
        choiceRepository.flush();
        return myChoice.getChoice_id();
    }
    @RequestMapping(value = "role", method = RequestMethod.POST)
    public Role getRole(Principal principal){
        DAOUser user = userRepository.findByUsername(principal.getName());
        Role output = new Role(user.getRole());
        return output;
    }
    @RequestMapping(value = "surveyResponse", method = RequestMethod.POST)
    public UserSurvey getSurveyResponseStatus(@RequestBody Long id, Principal principal) {
        Survey existingSurvey = surveyRepository.findById(id).get();
        if(existingSurvey.getSurvey_status().equals("SAVED")){
            UserSurvey output = new UserSurvey();
            output.setSurvey_status("ASSIGNED");
            return output;
        }
        DAOUser user = userRepository.findByUsername(principal.getName());
        UserSurvey userSurvey = userSurveyRepository.findByUserAndSurvey(id, user.getId()).get(0);
        return userSurvey;

    }
    @RequestMapping(value = "response/{id}", method = RequestMethod.POST)
    public void addSurveyResponses(@PathVariable Long id, @RequestBody SurveyResponses surveyResponses, Principal principal){
        DAOUser user = userRepository.findByUsername(principal.getName());
        UserSurvey userSurvey = userSurveyRepository.findByUserAndSurvey(id, user.getId()).get(0);
        Survey survey = surveyRepository.findById(id).get();
        if(userSurvey.getSurvey_status().equals("SUBMITTED")||(!survey.getSurvey_status().equals("ACTIVE"))){
            return;
        }
        surveyResponses.getResponses().forEach((question_id, response)->{
            Response entry = new Response();
            entry.setSurvey_id(id);
            entry.setUser_id(user.getId());
            entry.setQuestion_id(question_id);
            entry.setResponse(response);
            responseRepository.saveAndFlush(entry);
        });
        userSurvey.setSurvey_status("SUBMITTED");
        userSurveyRepository.saveAndFlush(userSurvey);
    }
    @RequestMapping(value = "deploy/{id}", method = RequestMethod.POST)
    public List<DAOUser> deploy(@PathVariable Long id, @RequestBody Criteria body){
        Survey existingSurvey = surveyRepository.findById(id).get();
        SurveyCriteria surveyCriteria = new SurveyCriteria();
        surveyCriteria.setSurvey_id(existingSurvey.getSurveyID());
        surveyCriteria.setMin_age(body.min_age);
        surveyCriteria.setMax_age(body.max_age);
        surveyCriteria.setCity(body.location);
        surveyCriteriaRepository.saveAndFlush(surveyCriteria);
        List<DAOUser> userList = userRepository.findByCriteria(body.min_age, body.max_age, body.location);
        userList.forEach(User -> {
            UserSurvey userSurvey = new UserSurvey();
            userSurvey.setUser_id(User.getId());
            userSurvey.setSurvey_id(existingSurvey.getSurveyID());
            userSurvey.setSurvey_status("ASSIGNED");
            userSurveyRepository.saveAndFlush(userSurvey);
        });
        existingSurvey.setSurvey_status("ACTIVE");
        surveyRepository.saveAndFlush(existingSurvey);

        return userList;
    }

    @RequestMapping(value = "locations", method = RequestMethod.GET)
    public List<String> locations(){
        return userRepository.findDistinctLocations();
    }

    @RequestMapping(value = "update/{id}", method = RequestMethod.PUT)
    public Survey updateState(@PathVariable Long id, @RequestBody Survey survey) {

        Survey existingSurvey = surveyRepository.findById(id).get();

        BeanUtils.copyProperties(survey, existingSurvey);
        return surveyRepository.saveAndFlush(existingSurvey);
    }

    @RequestMapping(value = "edit/{id}", method = RequestMethod.PUT)
    public Survey editSurvey(@PathVariable Long id, @RequestBody Survey survey) {
        Survey existingSurvey = surveyRepository.findById(id).get();
        BeanUtils.copyProperties(survey, existingSurvey);
        return surveyRepository.saveAndFlush(existingSurvey);
    }

}
