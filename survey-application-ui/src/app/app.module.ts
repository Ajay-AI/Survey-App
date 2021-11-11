import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { SurveyChartComponent } from './survey-chart/survey-chart.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { BasicAuthHtppInterceptorService } from './basic-auth-http-interceptor.service';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';





@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    SurveyResultsComponent,
    SurveyChartComponent,
    CreateSurveyComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    EditSurveyComponent,
    PopupComponent
  ],
  entryComponents:[PopupComponent],
  imports: [
    MatDialogModule,
    NgApexchartsModule,
    MatTableExporterModule,
    MatTableModule,
    MatStepperModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
