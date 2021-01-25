import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.scss']
})
export class CourseStudentsComponent implements OnInit, OnChanges {
  checked: boolean = false;
  loading: boolean = false;
  sendingEmails: boolean = false;
  courses: any[];
  students: any[];
  columns: string[] = ['select', 'name', 'email', 'completed'];
  selectedStudents = [];

  @Input() courseId: string;

  constructor(
    private _api: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.courseId && changes.courseId.currentValue) {
      this.getStudents();
    }
  }

  getStudents() {
    this.loading = true;
    this.selectedStudents.splice(0, this.selectedStudents.length);
    this._api.getCourseStudents(this.courseId)
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

  sendCompletionCertificate() {
    this.sendingEmails = true;
    this._api.sendCertificates(this.courseId, this.selectedStudents)
      .subscribe(response => {
        this.sendingEmails = false;
        this._snackBar.open(`Sent: ${response.queued}, failed: ${response.failed}`, null, {
          duration: 2000,
        });
      });
  }

  isCompleted(courseCompletion: any) {
    return courseCompletion && courseCompletion.total === courseCompletion.completed;
  }
}
