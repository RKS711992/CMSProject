import { Injectable } from "@angular/core";
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from "@angular/router";
import { HardCodedAuthenticationService } from "./hard-coded-authentication.service";
import { BasicAuthService } from "./basic-auth.service";

@Injectable({
  providedIn: "root"
})
export class RouteGuardService implements CanActivate {
  constructor(
    private hardcodedAuthenticationService: HardCodedAuthenticationService,
    private router: Router,
    private basicAuthService: BasicAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if(this.hardcodedAuthenticationService.isUserLoggedIn()){
    //   return true;
    // }
    if (this.basicAuthService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(["/cms"]);
    return false;
  }
}
