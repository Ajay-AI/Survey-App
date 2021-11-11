package com.project.survey.utils;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.project.survey.models.Response;
import org.springframework.jdbc.core.RowMapper;

public class ResponseRowMapper implements RowMapper<Response>{
    @Override
    public Response mapRow(ResultSet rs, int rowNum) throws SQLException {
        Response response = new Response();
        response.setSurvey_id(rs.getLong("survey_id"));
        response.setUser_id(rs.getLong("user_id"));
        response.setQuestion_id(rs.getLong("question_id"));
        response.setResponse_id(rs.getLong("response_id"));
        response.setResponse(rs.getString("response"));
        return response;
    }
}
