import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { filter } from 'minimatch';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private searchQuery: string = "";
  private items: any = null;
  private source: string;

  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router, private globals: Globals) { }

  grabResources() {
    const validSources = ["youtube","reddit","stackoverflow"];
    let source = (this.route.snapshot.paramMap.get("source"));
    const index = validSources.indexOf(source.toLowerCase());
    if (index === -1) {
      return;
    } else {
      this.source = validSources[index];
    }

    if (!this.searchQuery || this.searchQuery == "") return;

    this.http.get(("/api/"+this.source), 
    {
      params: {
        q: this.searchQuery
      }
    }).subscribe(
      (resp: any) => {
        this.items = resp.items;
        console.log(resp.items);
      },
    );
  }

  search(form) {
    const search = form.value.search.trim();
    if (search) {
      this.searchQuery = search;
      this.globals.searchQuery = search;
      this.grabResources();
    }
  }

  ngOnInit() {
    this.searchQuery = this.globals.searchQuery;

    this.router.events
    .subscribe(
      event => {
        if(event instanceof NavigationEnd) {
          this.items = null;
          this.source = this.route.snapshot.paramMap.get("source");
          this.grabResources();
        }
      }
    );

    this.grabResources();
  }

}
