import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('signup', style({
        overflow: 'hidden',
        height: '*',
        width: '300px'
      })),
      state('login', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('login => signup', animate('400ms ease-in-out')),
      transition('signup => login', animate('400ms ease-in-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  private mode: string = "login";
  private showPassword: boolean = false;
  private errorMessage: string;

  constructor(private http: HttpClient, private router: Router) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  modeSwitch() {
    this.mode = this.mode == "login" ? "signup" : "login";
    console.log("Clicked: "+this.mode);
  }

  handleResponse(resp: any) {
    if (resp.success) {
      // console.log("Login Successful!");
      this.router.navigate([""]);
    } else {
      const msg = resp.message;
      this.errorMessage = msg || "OOPS! Looks like something went wrong..";
      setTimeout(() => {
        this.errorMessage = null;
      },2000);
    }
  }

  authenticate(form) {
    const userInfo = {
      email: form.value.email,
      password: form.value.password
    }
    const pwCheck = form.value.cofirmedPassword;

    if (this.mode == "login") {
      this.http.post("/api/login", userInfo).subscribe(
        this.handleResponse, 
        error => {
          console.log(error.message);
        }
        ); 
    } else {
      if (userInfo.password !== pwCheck) return this.handleResponse({success: false, message: "Passwords do not match"});
      
      this.http.post("/api/signup", userInfo).subscribe(
        this.handleResponse, 
        error => {
          console.log(error.message);
        }
        ); 
    }
  }

  ngOnInit() {
  }

}
