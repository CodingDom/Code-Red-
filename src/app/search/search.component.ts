import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private searchQuery: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private globals: Globals) { }

  ngOnInit() {
    this.searchQuery = this.globals.searchQuery;
  }

}
