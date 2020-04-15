import { Component, OnInit } from '@angular/core';
import { HardCodedAuthenticationService } from 'src/app/services/hard-coded-authentication.service';
import { BasicAuthService } from 'src/app/services/basic-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private hardCodedAuthenticationService: HardCodedAuthenticationService, private basicAuthService: BasicAuthService) { }

  ngOnInit() {
    // this.hardCodedAuthenticationService.logout();
    this.basicAuthService.logout();
  }

}