import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { KeyloggerService } from '../../../services/keylogger.service' 
import { ParserService } from '../../../services/parser.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  providers: [CheckboxComponent],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userInput: string = 'this is a test'; //The quick brown fox jumped over the lazy dog
  userInputArray = new Array();
  complete: boolean = false;
  valid: boolean = true; 
  anotherValid: boolean = true; 

  constructor(
    private keylogger: KeyloggerService,
    private parser: ParserService,
    private auth: AuthService,
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
  
  onKeyUp(event: any) { this.keylogger.onKeyUp(event); }

  onKeyDown(event: any) { this.keylogger.onKeyDown(event); }

  onKeyPress(event: any) { this.keylogger.onKeyPress(event); }

  validateInput(event: any) {

    /*validateInput doesn't read ctrl, tab, etc so this needs to be done elsewhere*/
    const regex = new RegExp(event.target.value);
    if (!regex.test(this.userInput) ||!this.valid) {
      this.valid = false; 
      console.log("This sentence is wrong"); 
    }
  }

  //keyboard icon
  clearValue() {
    this.sentence?.reset(); 
    this.valid = true; 
    this.anotherValid = true;
    this.keylogger.reset(); 
  }

  checkComplete(event: any) {
    this.complete = event; 
  }

  onSubmitValidate() {
    if (this.username?.invalid) {
      return this.username?.markAllAsTouched(); 
    }
    else if (this.sentence?.invalid) {
      return this.sentence?.markAllAsTouched(); 
    }
    else if (!this.valid) {
      return this.anotherValid = false;
    }
    else if (!this.complete) {
      return this.checkbox?.markAsDirty();
    }
    else { return true }
  }


  onSubmit() {
    

    this.keylogger.initialiseName(this.username?.value);

    if (this.onSubmitValidate()) {

      const userTemplate = this.keylogger.getUser();

      const user = this.parser.getUser(userTemplate); 

      this.auth.register(user); 
    
      this.router.navigate(['/', 'login'], {queryParams: { registered: 'true'}})
        .then(nav => {
          this.keylogger.reset();
          console.log("Navigation = " + nav); // true if navigation is successful
        }, err => {
        });
    }  
  }
}


