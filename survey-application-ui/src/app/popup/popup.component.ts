import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'sa-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private surveyService : SurveyService) { }
  min_age:number=0;
  max_age:number=100;
  location:string="All"
  locations!: string[];
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onOkClick(): void {
    this.dialogRef.close({min_age: this.min_age, max_age: this.max_age, location: this.location});
  }
  ngOnInit(): void {
    this.surveyService.getLocations().subscribe((data)=>{
      this.locations=data
    })
  }
}
