import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { KeyloggerService } from './keylogger.service' 
import { ParserService } from './parser.service';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/user/';

const headers = { 'Content-Type': 'application/json'};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private keylogger: KeyloggerService,
    private parser: ParserService,
    private error: ErrorHandlerService,
    private router: Router
  ) {}

  register(user: any) {

    console.log(user); 

    this.http.post<any>(API_URL + 'register', JSON.stringify(user), {headers})
    .subscribe(data => {  

        console.log('DATA');
        console.log(data); 

        this.router.navigate(['/', 'login'], {queryParams: { registered: 'true'}}) 
        .then(nav => {
          this.keylogger.clear();
          this.parser.clear();
        }); 
      },
      err => {
        //errorHandler
        this.error.setErrorMessage(err);       
      });
  }

  login(user: any) {
    
    this.http.post<any>(API_URL + 'login', JSON.stringify(user), {headers})
    .subscribe(data => {
      
      this.router.navigate(['/', 'home'], {queryParams: { registered: 'true'}}) 
        .then(nav => {
          this.keylogger.clearLogin();
          this.parser.clearLogin();
          console.log('parser user'); 
          
          var u = this.parser.getUser;
          console.log(JSON.stringify(u)); 
        }); 
    },
    err => {
      this.error.setErrorMessage(err);       
    });
    
    
    
  }
}
