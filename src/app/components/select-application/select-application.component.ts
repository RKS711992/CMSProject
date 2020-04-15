import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { BasicAuthService } from "src/app/services/basic-auth.service";

@Component({
  selector: "app-select-application",
  templateUrl: "./select-application.component.html",
  styleUrls: ["./select-application.component.css"]
})
export class SelectApplicationComponent implements OnInit {
  name = "";
  password = "";
  userFromService: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private basicAuthService: BasicAuthService
  ) {}

  ngOnInit() {
    this.userFromService = this.basicAuthService.getAuthenticatedUser();
  }
}
