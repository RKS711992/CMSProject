import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardCodedAuthenticationService } from 'src/app/services/hard-coded-authentication.service';
import { BasicAuthService } from 'src/app/services/basic-auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  errorMessage = 'Invalid Credentials.'

  constructor(private router: Router, 
    private hardcodedAuthenticationService : HardCodedAuthenticationService,
    private basicAuthService : BasicAuthService,
    private ngFlashMessageService : NgFlashMessageService) { }

  ngOnInit() {
  }

  handleLogin(){
    if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
      console.log(this.username,"+",this.password)
        this.router.navigate(['cms/select-app',this.username])
        this.invalidLogin = false;
    }else{
      this.invalidLogin = true;
    }
  }
  handleBasicAuthLogin(){
   this.basicAuthService.executeBasicAUthentication(this.username,this.password).subscribe(
     response=>{
       console.log(response)
       this.router.navigate(['cms/select-app',this.username])
       this.invalidLogin = false;
    },
    error=>{
      console.log(error)
      this.invalidLogin = true;
    }
   )
  }

  handleJWTAuthLogin(){
    this.basicAuthService.executeJWTAUthentication(this.username,this.password).subscribe(
      response=>{
        console.log(response)
        this.ngFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Login Successful!!"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 500,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        this.router.navigate(['cms/select-app',this.username])
        this.invalidLogin = false;
     },
     error=>{
      //  console.log(error.message.message)
       this.ngFlashMessageService.showFlashMessage(
        {
          messages: [" Wrong Credentials!!!Try Again."],
          dismissible: true,
          timeout: 500,
          type: 'danger'
        });
       this.invalidLogin = true;
     }
    )
   }

}
