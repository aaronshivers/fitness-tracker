import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.css' ],
})
export class SignupComponent implements OnInit {
  maxDate;
  signupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [ Validators.required, Validators.email ],
      }),
      password: new FormControl('', {
        validators: [ Validators.required, Validators.min(6) ],
      }),
      birthday: new FormControl('', {
        validators: [ Validators.required ],
      }),
      agree: new FormControl(false)
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(): void {
    this.authService.registerUser({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    });
  }
}
