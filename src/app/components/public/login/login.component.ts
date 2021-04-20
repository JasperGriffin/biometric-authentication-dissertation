import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  checked = false;

  verifyCheckbox() {

    if (this.checked) {
      document.write('true')
    }
    else {
      document.write('false'); 
    }

  }
}
