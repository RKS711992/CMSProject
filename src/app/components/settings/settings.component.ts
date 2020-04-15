import { Component, OnInit } from '@angular/core';
import { BasicAuthService } from 'src/app/services/basic-auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private basicAuthService: BasicAuthService) { }

  ngOnInit() {
  }

}
