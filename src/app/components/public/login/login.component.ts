import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  checked = false;
  /*Constructor to store the user id, name and message of user*/

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
    else if (!this.checked) {
       this.userForm.get('accept')?.markAsDirty(); 
    }
    else {
      alert("Well done"); 
    }

    

  }


}
