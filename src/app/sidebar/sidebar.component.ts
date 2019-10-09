import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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

      break;
      case "favorites":

      break;
      default:
        const searchQuery = this.globals.searchQuery || "";
        this.router.navigate(["search", {source: value, q: searchQuery}]);
        break;
    }
  }

  ngOnInit() {
    console.log(this.route.url);
  }

}
