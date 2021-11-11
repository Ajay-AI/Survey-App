
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../survey.service';

interface Root {
  surveyID: number
  pages: Page[]
  surveyName: string
  survey_status: string
}
interface Page {
  page_description: string
  questions: Question[]
}

interface Question {
  name: string
  type: string
  choices: Choice[]
}

interface Choice {
  value: string
}

@Component({
  selector: 'sa-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})

export class EditSurveyComponent implements OnInit {
  panelOpenState = false;

  id!: number;
  form: FormGroup;
  survey: Root = {
    surveyID: 0,
    surveyName: "",
    survey_status: "SAVED",
    pages: []
  };
  index: number = 0;
  page_index: number = 0;
  choice_index: number = 0;
  types: string[] = ["TEXT", "DROPDOWN", "RADIO", "TEXTAREA"]
  Pages: { [k: string]: string } = {}
  Pages_values: { [k: string]: Page } = {}
  Questions: { [k: string]: string } = {}
  Questions_values: { [k: string]: Question } = {}
  Choices: { [k: string]: string } = {}


  constructor(private router: Router, private surveyService: SurveyService, private route: ActivatedRoute) {
    this.form = new FormGroup({});
    this.form.addControl("surveyName", new FormControl());
  }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.surveyService.getJSON(this.id).subscribe((data) => {
      this.form.setValue({ "surveyName": data.surveyName });
      let incoming: Root;
      incoming = data;
      incoming.pages.forEach((page) => {
        let page_id = `${this.page_index}_page`;
        this.Pages[`${this.page_index}_page`] = "";
        this.Pages_values[`${this.page_index}_page`] = { page_description: page.page_description, questions: [] };
        this.form.addControl(`${this.page_index}_page`, new FormControl());
        this.form.patchValue({ [page_id]: page.page_description });
        page.questions.forEach((question) => {
          this.form.addControl(`${this.index}`, new FormControl());
          this.form.addControl(`${this.index}_type`, new FormControl());
          this.Questions[`${this.index}`] = `${this.page_index}_page`;
          this.Questions_values[`${this.index}`] = { name: "", type: "", choices: [] };
          let qname = `${this.index}`;
          let qtype = `${this.index}_type`;
          this.form.patchValue({ [qname]: question.name })
          this.form.patchValue({ [qtype]: question.type })

          question.choices.forEach((choice) => {
            let cval = `${this.choice_index}_choice`;
            this.Choices[`${this.choice_index}_choice`] = qname;
            this.form.addControl(`${this.choice_index}_choice`, new FormControl());
            this.form.patchValue({ [cval]: choice.value })
            this.choice_index += 1;
          })
          this.index += 1;
        })
        this.page_index += 1;
      })
    })
  }
  addQuestion(id: string) {
    this.form.addControl(`${this.index}`, new FormControl());
    this.form.addControl(`${this.index}_type`, new FormControl());
    this.Questions[`${this.index}`] = id;
    this.Questions_values[`${this.index}`] = { name: "", type: "", choices: [] };
    this.index += 1;
  }
  addPage() {
    this.Pages[`${this.page_index}_page`] = "";
    this.Pages_values[`${this.page_index}_page`] = { page_description: "", questions: [] };
    this.form.addControl(`${this.page_index}_page`, new FormControl());
    this.page_index += 1;
    console.log(this.Pages)
  }
  addChoice(id: string) {
    this.Choices[`${this.choice_index}_choice`] = id;
    this.form.addControl(`${this.choice_index}_choice`, new FormControl());
    this.choice_index += 1;
  }

  objectKeys(obj: { [k: string]: string }): string[] {
    return Object.keys(obj);
  }
  saveSurvey() {
    this.survey.surveyID = this.id
    this.survey.surveyName = this.form.get("surveyName")?.value;
    this.survey.survey_status = "SAVED";
    (Object.keys(this.Choices)).forEach(key => {
      this.Questions_values[this.Choices[key]].choices.push({ value: this.form.get(key)?.value })
    });
    (Object.keys(this.Questions)).forEach(key => {
      this.Questions_values[key].name = this.form.get(key)?.value
      this.Questions_values[key].type = this.form.get(`${key}_type`)?.value
      this.Pages_values[this.Questions[key]].questions.push(this.Questions_values[key])
    });
    (Object.keys(this.Pages)).forEach(key => {
      this.Pages_values[key].page_description = this.form.get(key)?.value
      this.survey.pages.push(this.Pages_values[key])
    });

    this.surveyService.editSurvey(this.survey, this.id).subscribe((data) => {
      console.log("Success");
      this.router.navigate([`dashboard`])
    });

  }
  removeChoice(id: string) {
    delete this.Choices[id];
  }
  removeQuestion(id: string) {
    Object.keys(this.Choices).forEach(key => {
      if (this.Choices[key] === id) {
        this.removeChoice(key);
      }
    })
    delete this.Questions[id]
    delete this.Questions_values[id]
  }
  removePage(id: string) {
    Object.keys(this.Questions).forEach(key => {
      if (this.Questions[key] === id) {
        this.removeQuestion(key);
      }
    })

    delete this.Pages[id];
    delete this.Pages_values[id];


  }
}
