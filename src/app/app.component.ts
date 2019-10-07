import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'code-red-angular';

  constructor(private route: ActivatedRoute, private router: Router, private globals: Globals) {

  }

  ngOnInit(): void {
      this.router.events.subscribe(val => {

          if (val instanceof RoutesRecognized) {

              this.globals.searchQuery = val.state.root.firstChild.params.q;

          }
      });

  }

}
