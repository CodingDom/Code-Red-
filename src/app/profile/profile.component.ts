import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private name: string = "Anonymous";
  private blurb: string = this.name + " is too cool for a blurb or just hasn't had time to create one yet..";
  private owner: boolean;

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
    const contentType = content.id;

    content.setAttribute("contenteditable","false");
    btn.style.display = "initial";

    if (text == "" || (contentType == "displayName" && text == this.name) || (contentType == "blurb" && text == this.blurb)) return content.innerText = (contentType == "displayName" && this.name) || (contentType == "blurb" && this.blurb);

    this.http.put('/api/users/'+this.globals.user.id, {
      [contentType]: text
    }).subscribe(
      (res: any) => {
        console.log(text);
        if (!res.success) {
          content.innerText = (contentType == "displayName" && this.name) || (contentType == "blurb" && this.blurb);
          this.globals.user[contentType] = content.innerText;
        }
      },
      err => {
        content.innerText = (contentType == "displayName" && this.name) || (contentType == "blurb" && this.blurb);
      }
    );
  }

  ngOnInit() {
    const id = this.route.snapshot.url[1].path;

    if (this.globals.user && id == this.globals.user.id) {
      if (this.globals.user.name) {
        this.name = this.globals.user.name;
      }

      if (this.globals.user.blurb) {
        this.blurb = this.globals.user.blurb;
      }

      this.owner = true;
    } else {
      this.http.get('/api/users/'+id).subscribe(
        (res: any) => {
          this.name = res.displayName ? res.displayName : this.name;
          this.blurb = res.blurb ? res.blurb : this.blurb;
          this.owner = res.owner;
          console.log(res);
        }
      )
    }
  }

}
