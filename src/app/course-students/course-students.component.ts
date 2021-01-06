import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.scss']
})
export class CourseStudentsComponent implements OnInit {

  loading: boolean = false;
  sendingEmails: boolean = false;
  oauthKey: string;
  courseId: string;
  courses: any[];
  students: any[];
  columns: string[] = ['name', 'email', 'completed'];

  constructor(
    private _api: ApiService,
    private _snackBar: MatSnackBar
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

  getStudents() {
    const options = { oauthKey: this.oauthKey };
    this.loading = true;
    this._api.getCourseStudents(this.courseId, options)
      .subscribe(students => {
        this.students = students;
        this.loading = false;
      });
  }

  sendCompletionCertificate() {
    this.sendingEmails = true;
    const options = { oauthKey: this.oauthKey };
    this._api.sendCertificates(this.courseId, options)
      .subscribe(response => {
        this.sendingEmails = false;
        this._snackBar.open(`Sent: ${response.sent}, failed: ${response.failed}`, null, {
          duration: 2000,
        });
      });
  }

  isCompleted(courseCompletion: any) {
    return courseCompletion && courseCompletion.total === courseCompletion.completed;
  }
}
