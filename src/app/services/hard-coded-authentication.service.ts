import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardCodedAuthenticationService {

  constructor() { }

  authenticate(username,password){
    console.log('Before ', this.isUserLoggedIn())
    
    if(username == "upadmin" && password =="upadmin"){
      sessionStorage.setItem('authenticatedUser',username)
      console.log('After ', this.isUserLoggedIn())
      return true;
    }else if(username == "Rishabh" && password =="Rishabh"){
      sessionStorage.setItem('authenticatedUser',username)
      console.log('After ', this.isUserLoggedIn())
      return true;
    }
    return false;
  }
  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser')
    return !(user===null);
  }
  logout(){
    sessionStorage.removeItem('authenticatedUser')
  }
}
