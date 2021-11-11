package com.project.survey.controllers;

import com.project.survey.config.CustomUserDetailsService;
import com.project.survey.config.JwtUtil;
import com.project.survey.models.*;

import com.project.survey.repositories.SurveyCriteriaRepository;
import com.project.survey.repositories.UserRepository;
import com.project.survey.repositories.UserSurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private SurveyCriteriaRepository surveyCriteriaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSurveyRepository userSurveyRepository;

    @Autowired
    private JwtUtil jwtTokenUtil;


    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(token));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public List<Long> saveUser(@RequestBody UserDTO user) throws Exception {
        ResponseEntity.ok(userDetailsService.save(user));
        DAOUser userEntry = userRepository.findByUsername(user.getUsername());
        List<Long> ids = surveyCriteriaRepository.findSurveybyCriteria(user.getAge(), user.getCity());
        ids.forEach(id->{
                    UserSurvey userSurvey = new UserSurvey();
                    userSurvey.setUser_id(userEntry.getId());
                    userSurvey.setSurvey_id(id);
                    userSurvey.setSurvey_status("ASSIGNED");
                    userSurveyRepository.saveAndFlush(userSurvey);
                });
        return ids;
    }

}
