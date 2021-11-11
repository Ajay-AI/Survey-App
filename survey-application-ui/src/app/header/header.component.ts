import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  logout() { 
    this.authenticationService.logOut()
  }
  loggedIn(){
    return this.authenticationService.isUserLoggedIn()
  }
}
