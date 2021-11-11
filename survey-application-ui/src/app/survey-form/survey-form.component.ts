import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../survey.service';
import { MatInputModule } from '@angular/material/input';

export interface Root {
  pages: Page[]
  surveyName: string
  surveyID: number
  survey_status: string;
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
  selector: 'sa-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  title = '';
  Root!: Root;
  loaded = false;
  id!: number;
  public form: FormGroup;
  constructor(private surveyService: SurveyService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({});
   }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.surveyService.getJSON(this.id).subscribe(data => {
      this.Root = data;
      var obj: {[k: string]: any} = {};
      this.Root.pages.forEach(page => {
        page.questions.forEach(function (question){
          let question_id = question.question_id;
          obj[`${question_id}`]=new FormControl("");
        });
      });
      this.form=this.formBuilder.group(obj);
      this.loaded = true;
    });
  }
  onSubmit(): void {
    let submission: Submit = {
      survey_id:1,
      user_id:1,
      responses:this.form.getRawValue()
    }
    this.surveyService.submitResponse(submission, this.id).subscribe(()=>this.router.navigate([`dashboard`]));
  }
}
