import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private name: string = "Anonymous";

  constructor(private route: ActivatedRoute, private globals: Globals) { }

  ngOnInit() {
    const id = this.route.snapshot.url[1].path;

    if (this.globals.user && id == this.globals.user.id) {

    }
  }

}
