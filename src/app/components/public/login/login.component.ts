import { Component, OnInit } from '@angular/core';
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
      //Validators.pattern('The quick fox jumped over the lazy dog')])),
      Validators.pattern('test')]))
  });

  get username() { return this.userForm.get('username');  }

  get sentence() { return this.userForm.get('sentence'); }

  clearValue() {
    this.sentence?.reset(); 

    //reset array
  }
  
  onSubmit() {

    

    if (this.username?.invalid) {
      this.username?.markAllAsTouched(); 
    }
    else if (this.sentence?.invalid) {
      this.sentence?.markAllAsTouched(); 
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
