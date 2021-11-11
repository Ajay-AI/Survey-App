import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'sa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: any;
  alert: boolean=false;

  constructor(private surveyService: SurveyService, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['dashboard'])
    }
  }
  login(username: string, password: string) {
    this.authenticationService.authenticate(username, password).subscribe(
      data => {
        sessionStorage.setItem('username', username);
        let tokenStr = 'Bearer ' + data.token;
        sessionStorage.setItem('token', tokenStr);
        this.router.navigate(['dashboard'])
      },
      error =>{
        this.errors=error;
        this.alert=true;
        console.error();
      }

    )
  }
  close(){
    this.alert=false;
  }

  register(username: string, password: string, age: number, city: string) {
    this.surveyService.register({ "username": username, "password": password, "age": age, "city": city}).subscribe((data)=>{
      console.log(data)
      window.location.reload();

    })
  }

}
