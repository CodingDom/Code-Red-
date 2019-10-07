import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
 
  constructor(private route: Router, private globals: Globals) { }

  search(form) {
    const searchQuery = form.value.search ? form.value.search.trim() : null;
    if (!searchQuery) return;

    this.globals.searchQuery = searchQuery;
    this.route.navigate(['/search', {source: "youtube",q: searchQuery}]);
  }

  ngOnInit() {
  }

}
