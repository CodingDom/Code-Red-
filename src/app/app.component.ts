import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    
  ]
})
export class AppComponent {
  title = 'code-red-angular';
  private location: string;

  constructor(private route: ActivatedRoute, private router: Router, private globals: Globals) {

  }

  ngOnInit(): void {
      this.router.events.subscribe(val => {

          if (val instanceof RoutesRecognized) {
              const currRoute = val.state.root.firstChild;
              const params = currRoute.params;
              const source = params.source;
              this.globals.searchQuery = params.q;
              this.location = source || currRoute.url[0];

          }
      });

  }

}
