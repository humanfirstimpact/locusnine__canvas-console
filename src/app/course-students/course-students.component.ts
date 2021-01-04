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

        students.forEach(s => {
          this._api.getCourseModulesForStudent(this.courseId, s.id, options)
            .subscribe(items => {
              //Check if all items of students are completed
              s.completed = {
                total: items.length,
                completed: items.filter(i => !!i.completed_at).length
              };
            })
        });
      });
  }

  sendCompletionCertificate() {
    const students = this.students.filter(s => s.completed && s.completed.completed === s.completed.total);
    const course = this.courses.find(c => c.id == this.courseId);
    this._api.sendCertificates({
      course: { id: course.id, name: course.name },
      students: students.map(s => { return { id: s.id, name: s.name, email: s.email }; })
    }).subscribe(response => {
      this._snackBar.open(`Sent: ${response.sent}, failed: ${response.failed}`, null, {
        duration: 2000,
      });
    });
  }

  isCompleted(courseCompletion: any) {
    return courseCompletion && courseCompletion.total === courseCompletion.completed;
  }
}
