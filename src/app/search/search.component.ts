import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { filter } from 'minimatch';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private subscribed: any;
  private searchQuery: string = "";
  private items: any = null;
  private source: string;
  private contentSelected: any;
  private url: SafeResourceUrl;

  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router, private globals: Globals, private sanitizer: DomSanitizer) { }

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
        if (!resp.error) {
          this.items = resp.items;
          console.log(resp.items);
        } else {
          console.log("Quota reached.");
        }
      },
    );
  }

  openVideo(info) {
    const url = "https://www.youtube.com/embed/" + info.id.videoId;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.contentSelected = info.id.videoId;
  }

  search(form) {
    const search = form.value.search.trim();
    if (search) {
      this.searchQuery = search;
      this.globals.searchQuery = search;
      this.grabResources();
    }
  }

  ngOnDestroy() {
    this.subscribed.unsubscribe();
  }

  ngOnInit() {
    this.searchQuery = this.globals.searchQuery;

    this.subscribed = this.router.events
    .subscribe(
      event => {
        if(event instanceof NavigationEnd) {
          this.items = null;
          this.source = this.route.snapshot.paramMap.get("source");
          this.contentSelected = null;
          this.url = null;
          this.grabResources();
        }
      }
    );

    this.grabResources();
    if (document["$"] && document["$"]["stacktack"]) {
      document["$"]["stacktack"]();
    }
  }

}
