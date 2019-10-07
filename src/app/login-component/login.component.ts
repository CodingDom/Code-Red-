import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  constructor() { }

  modeSwitch() {
    this.mode = this.mode == "login" ? "signup" : "login";
    console.log("Clicked: "+this.mode);
  }

  ngOnInit() {
  }

}
