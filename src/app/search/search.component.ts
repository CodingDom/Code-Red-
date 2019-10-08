import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private searchQuery: string = "";
  private items: any = [];

  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router, private globals: Globals) { }

  ngOnInit() {
    this.searchQuery = this.globals.searchQuery;
    const validSources = ["youtube","reddit","stackoverflow"];
    let source = (this.route.snapshot.paramMap.get("source"));
    const index = validSources.indexOf(source.toLowerCase());
    if (index === -1) {
      return;
    } else {
      source = validSources[index];
    }
    
    this.http.get(("/api/"+source), 
    {
      params: {
        q: this.searchQuery
      }
    }).subscribe(
      resp => {
        this.items = resp.items;
      },
    )
  }

}
