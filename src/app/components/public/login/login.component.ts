import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  infoMessage: string = ''; 

  constructor (
    private router: Router,
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
      Validators.pattern('test')]))
  });

  get username() { return this.userForm.get('username');  }

  get sentence() { return this.userForm.get('sentence'); }

  //mouse listener
  @HostListener('mousemove', ['$event'])
  handleMousemove(event: MouseEvent) {
    //this.keylogger.onMouseMove(event); 
  }

  clearValue() {
    this.sentence?.reset(); 
    //reset array
  }

  onSubmitValidate() {
    if (this.username?.invalid) {
      return this.username?.markAllAsTouched(); 
    }
    else if (this.sentence?.invalid) {
      return this.sentence?.markAllAsTouched(); 
    }
    else {
      return true;
    }
  }
  
  onSubmit() {

    if (this.onSubmitValidate()) {
      const loggedIn: string[] = ['/home'];
      this.router.navigate(loggedIn);
    }
  
  }

  createAcc() {
    const register: string[] = ['/register'];
    this.router.navigate(register);
  }


}
