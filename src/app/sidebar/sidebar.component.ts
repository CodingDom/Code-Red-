import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private active: HTMLElement;

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
    console.log(this.route.url);
  }

}
