import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
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
          const source = params.source;
          const btn = document.querySelector('[value='+(source || currRoute.url[0])+']') as HTMLElement;
          if (btn) {
            if (this.active) {
              this.active.classList.remove('active');
            }
            btn.classList.add("active");
            this.active = btn;
          }

      }
  });
  }

}
