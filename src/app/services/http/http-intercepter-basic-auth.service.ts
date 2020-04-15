import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthService } from '../basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {


  constructor(private basicAuthService: BasicAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // let headerUsername = 'upadmin';
    // let headerPassword = 'upadmin';
    // let basicAuthHeaderString = 'Basic ' + window.btoa(headerUsername + ':' + headerPassword);
    let username = this.basicAuthService.getAuthenticatedUser();
    let basicAuthToken = this.basicAuthService.getAuthenticatedToken();
    if (username && basicAuthToken) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthToken
        }
      })
    }
    return next.handle(req);

  }
}
