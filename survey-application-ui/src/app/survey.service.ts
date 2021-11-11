import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Submit } from './survey-form/survey-form.component';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) {

  }
  public getLocations(): Observable<any>{
    return this.http.get(`http://localhost:4200/locations`)
  }
  public deploySurvey(id: number, body: any): Observable<any>{
    return this.http.post(`http://localhost:4200/deploy/${id}`, body)
  }
  public getRole(): Observable<any>{
    return this.http.post(`http://localhost:4200/role`, "");
  }
  public getUserSurvey(id: number): Observable<any>{
    return this.http.post(`http://localhost:4200/surveyResponse`, id);
  }
  public getJSON(id: number): Observable<any>{
    return this.http.get(`http://localhost:4200/survey/${id}`);
  }
  public getToken(credentials: {[k:string]:string}): Observable<any>{
    return this.http.post(`http://localhost:4200/authenticate`, credentials);
  }
  public register(credentials: {[k:string]:any}): Observable<any>{
    return this.http.post(`http://localhost:4200/register`, credentials);
  }
  public getSurvey(): Observable<any>{
    return this.http.get(`http://localhost:4200/survey/`);
  }
  public updateState(state: any): Observable<any>{
    return this.http.put(`http://localhost:4200/update/${state.surveyID}`, state);
  }
  public submitResponse(submitResponse: Submit, id: number): Observable<any>{
    return this.http.post(`http://localhost:4200/response/${id}`, submitResponse);
  }
  public getResponses(id: number): Observable<any>{
    return this.http.get(`http://localhost:4200/surveyResults/${id}`);
  }
  public postSurvey(survey: {}): Observable<any>{
    return this.http.post<any>("http://localhost:4200/create", survey);
  }
  public editSurvey(survey: {}, id: number): Observable<any>{
    return this.http.put<any>(`http://localhost:4200/edit/${id}`, survey);
  }
  public postPage(page: {}): Observable<any>{
    return this.http.post<any>("http://localhost:4200/page", page);
  }
  public postQuestion(question: {}): Observable<any>{
    return this.http.post<any>("http://localhost:4200/question", question);
  }
  public postChoice(choice: {}): Observable<any>{
    return this.http.post<any>("http://localhost:4200/choice", choice);
  }
}
