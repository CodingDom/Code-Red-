import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private name: string = "Anonymous";
  private blurb: string = this.name + " is too cool for a blurb or just hasn't had time to create one yet..";

  constructor(private route: ActivatedRoute, private http: HttpClient, private globals: Globals) { }

  edit(e: Event) {
    const btn = e.target as HTMLElement;
    const content = btn.parentElement.querySelector('.content') as HTMLElement;

    btn.style.display = "none";
    content.setAttribute("contenteditable","true");
    content.focus();

    // Setting caret/cursor position to the end
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(content.childNodes[0], content.innerText.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  save(e: Event) {
    const content = e.target as HTMLElement;
    const btn = content.parentElement.querySelector('.icon') as HTMLElement;
    const text = content.innerText.trim();

    content.setAttribute("contenteditable","false");
    btn.style.display = "initial";

    if (text == "" || text == this.name) return content.innerText = this.name;

  }

  ngOnInit() {
    const id = this.route.snapshot.url[1].path;

    if (this.globals.user && id == this.globals.user.id) {

    }
  }

}
