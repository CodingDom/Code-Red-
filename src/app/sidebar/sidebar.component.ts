import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Globals } from '../globals';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: 0
      })),
      state('closed', style({
        left: '-50px'
      })),
      transition('open <=> closed', [
        animate('0.25s')
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  private active: HTMLElement;
  private activeRoute: string;
  
  constructor(private route: ActivatedRoute, private router: Router, private globals: Globals) { }

  menuToggle(e: Event) {
    const btn = (e.target as HTMLElement);
    btn.classList.toggle("btnc");
    document.querySelector("#side-bar").toggleAttribute("data-open");
  }

  menuButton(e: Event) {
    const btn = (e.target as HTMLElement);
    const value = btn.getAttribute("value");
    
    switch (value) {
      case "profile":
        if (!this.globals.user) {
          this.router.navigate(["/login"]);
        } else {
          this.router.navigate(["/users/"+this.globals.user.id]);
        }
      break;
      case "code":
        this.router.navigate(['editor']);
      break;
      case "favorites":

      break;
      default:
        const searchQuery = this.globals.searchQuery || "";
        this.router.navigate(["search", {source: value, q: searchQuery}]);
        break;
    }
    
    if (this.active) {
      this.active.classList.remove('active');
    }
    btn.classList.add("active");
    this.active = btn;
  }

  ngOnInit() {
    this.router.events.subscribe(val => {

      if (val instanceof RoutesRecognized) {
          const currRoute = val.state.root.firstChild;
          const params = currRoute.params;
          const source = (params.source || ((currRoute.url[1] && this.globals.user && this.globals.user.id && currRoute.url[1] == this.globals.user.id && "profile")) || currRoute.url[0]);
          const btn = document.querySelector('[value='+(source)+']') as HTMLElement;
          this.activeRoute = source;
          if (btn) {
            if (this.active) {
              this.active.classList.remove('active');
            }
            btn.classList.add("active");
            this.active = btn;
          } else if (source == "" || !source) {
            if (this.active) {
              this.active.classList.remove('active');
            }
          }
      }
  });
  }

}
