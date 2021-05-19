import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { KeyloggerService } from '../../../services/keylogger.service';
import { ParserService } from '../../../services/parser.service';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  userInput: string = 'this is a test';
  infoMessage: string = ''; 
  errorMessage: string = ''; 
  valid: boolean = true; 
  anotherValid: boolean = true;

  constructor (
    private router: Router,
    private keylogger: KeyloggerService,
    private parser: ParserService,
    private auth: AuthService,
    private error: ErrorHandlerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.infoMessage = "Registration complete, you may now login.";
        }
      })
  }

  userForm = new FormGroup({
    username : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('User#[0-9]{4}')])),

    sentence : new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(this.userInput)]))
  });

  get username() { return this.userForm.get('username');  }

  get sentence() { return this.userForm.get('sentence'); }

  //keyboard listeners
  onKeyUp(event: any) { this.keylogger.onKeyUp(event); }

  onKeyDown(event: any) { this.keylogger.onKeyDown(event); }

  onKeyPress(event: any) { this.keylogger.onKeyPress(event); }

  //mouse listener
  @HostListener('mousemove', ['$event'])
  handleMousemove(event: MouseEvent) {
    this.keylogger.onMouseMove(event); 
  }

  validateInput(event: any) {
    /*validateInput doesn't read ctrl, tab, etc so this needs to be done elsewhere*/
    //this.num = event.path[this.keyboardID].id;

    const regex = new RegExp(event.target.value);
    if (!regex.test(this.userInput) ||!this.valid) {
      this.valid = false; 
      console.log("This sentence is wrong"); 
    }
  }

  clearValue() {
    this.sentence?.reset(); 
    this.keylogger.clearLogin();
    this.parser.clearLogin(); 

    this.valid = true; 
    this.anotherValid = true;
    //reset array
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
    else {
      return true;
    }
  }
  
  onSubmit() {
    
    this.keylogger.initialiseUser(this.username?.value);


    if (this.onSubmitValidate()) {
      const userTemplate = this.keylogger.getUser();
      const user = this.parser.getUser(userTemplate); 

      //deleting empty arrays
      delete user.key[1];
      delete user.key[2];
      console.log(user);
      this.auth.login(user); 
    }
  
  }

  createAcc() {
    const register: string[] = ['/register'];
    this.router.navigate(register);
  }


}
