import { Component, OnInit } from '@angular/core';
import { HardCodedAuthenticationService } from 'src/app/services/hard-coded-authentication.service';
import { BasicAuthService } from 'src/app/services/basic-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isUserLoggedIn : boolean = false
  constructor(private hardcodedAuthenticationService : HardCodedAuthenticationService, private basicAuthService: BasicAuthService) { }
  
  ngOnInit() {
    // this.isUserLoggedIn = this.hardcodedAuthenticationService.isUserLoggedIn()
    this.isUserLoggedIn = this.basicAuthService.isUserLoggedIn()
  }

}
