import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from '../survey-form/survey-form.component';
import { SurveyService } from '../survey.service';
import { CdkTableExporterModule } from 'cdk-table-exporter';
import { ActivatedRoute } from '@angular/router';


export interface Response {
  response_id: number
  survey_id: number
  user_id: number
  question_id: number
  response: string
}

@Component({
  selector: 'sa-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})

export class SurveyResultsComponent extends CdkTableExporterModule implements OnInit {

  responses: Response[];
  renderedData: any;
  loaded: boolean = false;
  constructor(private surveyService: SurveyService, private route : ActivatedRoute) { 
    super();
    this.responses=[];
    this.data = new MatTableDataSource();
    this.data.connect().subscribe(d => this.renderedData = d);

  }
  tableData: {[id:number]:{[k: string]: string}} = {};
  questions: {[question_id:string]: string} = {};
  data: MatTableDataSource < {[k: string]: string} >;
  displayedColumns: string[] = ["User ID"];
  chartData : {[id:string]:{[k: string]: number}} = {};

  ngOnInit(): void {
    this.surveyService.getResponses(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data=>{
      this.responses = data;
      this.surveyService.getJSON(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data=>{
        data.pages.forEach((page: Page) => {
          page.questions.forEach( (question) =>{
            this.questions[question.question_id]=question.name;
            this.displayedColumns.push(question.name);
            if(question.type==="DROPDOWN"||question.type==="RADIO"){
              this.chartData[question.question_id]={};
              question.choices.forEach((choice)=>{
                this.chartData[question.question_id][choice.value]=0;
              })
            }
          });
        });
        this.responses.forEach((response)=>{
          this.tableData[response.user_id]={};
          this.tableData[response.user_id]["User ID"]=`${response.user_id}`;
          if(response.question_id in this.chartData){
            this.chartData[response.question_id][response.response] += 1;
          }
        })
        this.responses.forEach((response)=>{
          this.tableData[response.user_id][this.questions[response.question_id]]=response.response;
        });
        for(const i in this.tableData){
          const data = this.data.data;
          data.push(this.tableData[i]);
          this.data.data = data;
        }
        this.loaded = true;
      });
      

    });
   
  }
  objectKeys(obj:{[id:string]:{[k: string]: number}}): string[] {
    return Object.keys(obj);
  }

}
