import { Component, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

export interface Root {
  pages: Page[]
  surveyName: string
  surveyID: number
  survey_status: string
}
export interface Page {
  page_id: number
  survey_id: number
  page_description: string
  questions: Question[]
}

export interface Question {
  name: string
  type: string
  choices: Choice[]
  question_id: number
}

export interface Choice {
  choice_id: number
  value: string
}
export interface Submit {
  survey_id: number
  user_id: number
  responses: {number: string}[]
}



@Component({
  selector: 'sa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loaded: boolean = false;
  id!: number;
  surveys: Root[];
  displayedColumns: string[] = ['surveyName', 'survey_status', 'surveyID', 'actions'];
  title: string[] = ['Name', 'Status', 'ID', 'Actions']
  dataSource!: MatTableDataSource<Root>
  adminAccess: boolean = true;
  submitted: {[k:string]:boolean}={};
  deployPanel: boolean=false;
  currentDeployID!: number;

  constructor(private surveyService: SurveyService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    this.surveys=[];
   }
   
  ngOnInit(): void {
    this.getAllSurveys();
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.dataSource = new MatTableDataSource<Root>(this.surveys);
    this.surveyService.getRole().subscribe(data=>{
      if(data.role==="ROLE_ADMIN"){
        this.adminAccess=true;
      }
      else{
        this.adminAccess=false;
      }
    })

  }
  

  public getAllSurveys(){
    this.surveyService.getSurvey().subscribe(data=>{
      data.forEach((element:any) => {
        if(this.adminAccess==true){
          this.submitted[element.survey_id]=false
        }
        else{
          this.surveyService.getUserSurvey(element.surveyID).subscribe((data)=>{
            this.submitted[data.survey_id]=(data.survey_status==="SUBMITTED")
          });
        }
      });
      this.dataSource.data=data;
      this.loaded = true; 
    })
  }

  state(row: any): void {
    if (row.survey_status=="SAVED") {

    }
    else if(row.survey_status=="ACTIVE"){
      row.survey_status="INACTIVE"
      this.surveyService.updateState(row).subscribe(()=>this.router.navigate(['dashboard']));
    }
    else{
      row.survey_status="ACTIVE"
      this.surveyService.updateState(row).subscribe(()=>this.router.navigate(['dashboard']));
    }
  }

  openDialog(row: any){
    let dialogRef = this.dialog.open(PopupComponent, row);
    dialogRef.afterClosed().subscribe(result => {
      if(result==false){
        return;
      }
      this.surveyService.deploySurvey(row.surveyID, {min_age: result.min_age, max_age: result.max_age, location: result.location}).subscribe((data)=>{
      });
      row.survey_status="ACTIVE"
    })
  }

  create(){
    this.router.navigate(['create'])
  }
  surveyform(surveyID: number){
    this.router.navigate([`survey/${surveyID}`])
  }
  results(surveyID: number){
    this.router.navigate([`surveyResults/${surveyID}`])
  }
  edit(surveyID: number){
    this.router.navigate([`edit/${surveyID}`])
  }

}
