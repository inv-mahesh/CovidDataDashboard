import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService) { }

  loginForm!: FormGroup;
  validData : boolean = true;
  isLoading : boolean = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username  : new FormControl('',[Validators.required]),
      password  : new FormControl('',[Validators.required])
    })
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }


  login() : void {
    if (this.loginForm.valid) {
      if(this.username?.value != 'fingent' || this.password?.value != 'fingent')
          this.validData = false;
      else
        this.authService.login(this.loginForm.value);
    }
  }

}
