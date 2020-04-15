import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JPA_API_URL, USER_API_URL } from "../app.constants";
import { map } from "rxjs/operators";

export class BasicAuthenticationBean {
  constructor(public username: string) {}
}

@Injectable({
  providedIn: "root"
})
export class BasicAuthService {
  constructor(private http: HttpClient) {}

  executeJWTAUthentication(username, password) {
    return this.http
      .post<any>(`${USER_API_URL}/authenticate`, {
        username,
        password
      })
      .pipe(
        map(data => {
          sessionStorage.setItem("authenticatedUser", username);
          sessionStorage.setItem("token", `Bearer ${data.token}`);
          return data;
        })
      );
    //By using .pipe() what we are doing is that we are adding more declarations. It says what should be done if the request succeeds or fails.
  }

  executeBasicAUthentication(username, password) {
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password);
    let httpHeader = new HttpHeaders({ Authorization: basicAuthHeaderString });
    return this.http
      .get<BasicAuthenticationBean>(`${USER_API_URL}/basicAuth/${username}`, {
        headers: httpHeader
      })
      .pipe(
        map(data => {
          sessionStorage.setItem("authenticatedUser", username);
          sessionStorage.setItem("token", basicAuthHeaderString);
          return data;
        })
      );
    //By using .pipe() what we are doing is that we are adding more declarations. It says what should be done if the request succeeds or fails.
  }
  getAuthenticatedUser() {
    return sessionStorage.getItem("authenticatedUser");
  }
  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem("token");
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    return !(user === null);
  }
  logout() {
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("token");
  }
  showRegisterAndSettings() {
    if (this.isUserLoggedIn && this.getAuthenticatedUser() == "upadmin") {
      return true;
    }
    return false;
  }
}
