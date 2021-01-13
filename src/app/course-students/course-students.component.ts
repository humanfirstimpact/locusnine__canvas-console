import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.scss']
})
export class CourseStudentsComponent implements OnInit {
  checked: boolean = false;
  loading: boolean = false;
  sendingEmails: boolean = false;
  oauthKey: string;
  courseId: string;
  courses: any[];
  students: any[];
  columns: string[] = ['select', 'name', 'email', 'completed'];
  selectedStudents = [];

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
    this.selectedStudents.splice(0, this.selectedStudents.length);
    this._api.getCourseStudents(this.courseId, options)
      .subscribe(students => {
        this.students = students;
        this.loading = false;
      });
  }  

checkboxChanged(event) {
    const id = event.source.id; 
    if (event.checked) this.selectedStudents.push(parseInt(id));
    else {
        const i = this.selectedStudents.indexOf(parseInt(id));
        this.selectedStudents.splice(i, 1);
    }
}

submit(){
  console.log(this.selectedStudents);
}

  sendCompletionCertificate() {
    this.sendingEmails = true;
    const options = { oauthKey: this.oauthKey };
    this._api.sendCertificates(this.courseId,this.selectedStudents, options)
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
