import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  /*Constructor to store the user id, name and message of user*/

  constructor (
    private router: Router
  ) {}

  userForm = new FormGroup({
    username : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('User#[0-9]{4}')])),
    sentence : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('The quick fox jumped over the lazy dog')])),
    accept : new FormControl('', [(control) => {    
      return !control.value ? { 'required': true } : null;
    }]
    )
  });
  
  onSubmit() {

    if (this.userForm.get('username')?.invalid) {
      this.userForm.get('username')?.markAllAsTouched(); 
    }
    else if (this.userForm.get('sentence')?.invalid) {
      this.userForm.get('sentence')?.markAllAsTouched(); 
    }
    else {
      const loggedIn: string[] = ['/home'];
      this.router.navigate(loggedIn);
    }
  }

  createAcc() {
    const register: string[] = ['/register'];
    this.router.navigate(register);
  }


}
