import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  course_1 = 'Being a Good Human';
  tutor1 = 'International Schools';
  duration1 = '1h';
  date = 'January 15, 2021';
  oauthKey: string;
  courses: any[];
  cost: number= 300;

  constructor(
    private _api: ApiService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    forkJoin([
      this._api.getCourses(),
      this._api.getLoggedInUser()
    ]).subscribe(response => {
      const courses = response[0];
      const user = response[1];

      courses.forEach(course => {
        course.tutor = user;
      });

      this.courses = courses;
    }, (error: any) => {
      if (error && error.error && error.error.errors && error.error.errors.length > 0 && error.error.errors[0].message === 'Invalid access token.') {
        this._router.navigate(['/']);
      }
    });
  }

  toDateString(dateString: string): string {
    if (!dateString)
      return '-';

    const dateObj = new Date(dateString);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
  }
}
