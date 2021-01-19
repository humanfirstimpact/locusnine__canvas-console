import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  course_1= 'Being a Good Human';
  tutor1= 'International Schools';
  duration1='1h';
  date='January 15, 2021';
  courseId: string;
  oauthKey: string;
  courses: any[];

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  getCourses(e) {
    this.oauthKey = e.currentTarget.value;
    this._api.getCourses({ oauthKey: this.oauthKey })
      .subscribe(courses => {
        this.courses = courses;
      });
  }
}
