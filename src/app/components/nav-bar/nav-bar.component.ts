import { Component, OnInit } from '@angular/core';
import { BasicAuthService } from 'src/app/services/basic-auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isUserLoggedIn: boolean = false
  constructor(private basicAuthService: BasicAuthService) { }

  ngOnInit() {
    // this.isUserLoggedIn = this.hardcodedAuthenticationService.isUserLoggedIn()
    this.isUserLoggedIn = this.basicAuthService.isUserLoggedIn()
  }

}
