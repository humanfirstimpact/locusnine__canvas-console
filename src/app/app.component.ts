import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'canvas-console';
  links: any[];
  activelinkIndex = -1;
  constructor(private router: Router) {
    this.links = [
      {
        label: 'Courses',
        link: './courses',
        index: 0
      }, {
        label: 'Students',
        link: './students',
        index: 1
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activelinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
