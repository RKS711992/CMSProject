import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { USER_API_URL } from '../app.constants';
import { BasicAuthService } from './basic-auth.service';

export class UserBean {
  constructor(public username: string) {

  }
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private basicAuthService: BasicAuthService) { }

  returnMesageWithParameter(name: string) {
    /*console.log(this.createBasicHttpHeaders())
    let httpHeader = new HttpHeaders({ Authorization: this.createBasicHttpHeaders() });
    return this.http.get<UserBean>(`${USER_API_URL}/users/path-variable/${name}`, { headers: httpHeader })*/
    return this.http.get<UserBean>(`${USER_API_URL}/users/path-variable/${name}`)
  }
  /*createBasicHttpHeaders(){
    let httpHeaderUserName = 'upadmin';
    let httpHeaderPassword = 'upadmin';
    let basicAuthHeaderString = 'Basic ' + window.btoa(httpHeaderUserName + ':' + httpHeaderPassword);
    return basicAuthHeaderString;
  }*/
}