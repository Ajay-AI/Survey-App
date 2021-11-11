import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './auth-guard.service';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { LoginComponent } from './login/login.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';

const routes: Routes = [{ path: 'surveyResults/:id', component:  SurveyResultsComponent, canActivate:[AuthGaurdService] },
{ path: 'create', component: CreateSurveyComponent, canActivate:[AuthGaurdService] },
{ path: 'survey/:id', component: SurveyFormComponent, canActivate:[AuthGaurdService] },
{ path: 'edit/:id', component: EditSurveyComponent, canActivate:[AuthGaurdService] },
{ path: 'dashboard', component: DashboardComponent, canActivate:[AuthGaurdService] },
{ path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
