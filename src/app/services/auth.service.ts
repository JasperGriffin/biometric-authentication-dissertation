import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/user/';

const headers = { 'Content-Type': 'application/json'};

export class User {
  'username': string = '';   
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  register(user: any) {

    this.http.post<any>(API_URL + 'register', JSON.stringify(user), {headers})
      .subscribe(data => {  
    });
    
  
    

  }
}
