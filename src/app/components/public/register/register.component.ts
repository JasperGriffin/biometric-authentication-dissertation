import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckboxComponent } from './checkbox/checkbox.component';

import { KeyloggerService } from '../../../services/keylogger.service' 

@Component({
  providers: [CheckboxComponent],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userInput: string = 'test'; //The quick brown fox jumped over the lazy dog
  userInputArray = new Array();
  complete: boolean = false;
  valid: boolean = true; 
  anotherValid: boolean = true; 

  constructor(
    private keylogger: KeyloggerService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  userForm = new FormGroup({
    username : new FormControl('', Validators.compose([
      Validators.required,
      
      Validators.pattern('User#[0-9]{4}') 
      
    ])),

    sentence : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(this.userInput)])),

    checkbox : new FormControl('', [(control) => {    
      return !control.value ? { 'required': true } : null;
    }]
    )
  });

  get username() { return this.userForm.get('username');  }

  get sentence() { return this.userForm.get('sentence'); }

  get checkbox() { return this.userForm.get('checkbox'); }
  
  onKeyUp(event: any) {
    this.keylogger.onKeyUp(event); 
  }

  onKeyDown(event: any) {
    this.keylogger.onKeyDown(event);
  }

  onKeyPress(event: any) {
    this.keylogger.onKeyPress(event);
  }

  validateInput(event: any) {
    const regex = new RegExp(event.target.value);

    console.log('keys: ' + event.key); 

    if (regex.test(this.userInput) && this.valid) {
      console.log('This sentence is right: ' + event.target.value);
    }
    else {
      this.valid = false; 
    }
  }

  //keyboard icon
  clearValue() {
    this.sentence?.reset(); 
    this.sentence?.enable();
    this.valid = true; 
    this.anotherValid = true;
    this.keylogger.reset(); 
  }

  checkComplete(event: any) {
    this.complete = event; 
  }

  onSubmit() {

    if (this.username?.invalid) {
      this.username?.markAllAsTouched(); 
    }
    else if (this.sentence?.invalid) {
      this.sentence?.markAllAsTouched(); 
    }
    else if (!this.valid) {
      //this.sentence?.markAllAsTouched();
      this.anotherValid = false;
      console.log('this condition is being passed'); 
    }
    else if (!this.complete) {
      this.checkbox?.markAsDirty();
    }
    else {

      //this.authService(); 
      
      this.router.navigate(['/', 'login'], {queryParams: { registered: 'true'}})
        .then(nav => {
          console.log("Navigation = " + nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });
    }
  }

}


