import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  public studentDetails: any[] = [{ id: 0, name: '', email: '' }]

  purchaserName = new FormControl('', [
    Validators.required
  ]);

  purchaserEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  participantsCount: number = 1;
  courseId: any;
  course: any;
  val: any;

  constructor(
    private _api: ApiService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((map) => {
      this.courseId = parseInt(map.get('courseId'));
    })
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((data) => {
        this.course = data.data;
      });
  }

  toDateString(dateString: string): string {
    if (!dateString)
      return '-';

    const dateObj = new Date(dateString);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
  }

  total(val) {
    this.studentDetails = [{ id: 0, name: '', email: '' }];
    for (var i = 0; i < this.participantsCount - 1; i++) {
      this.studentDetails.push({ id: i + 1, name: '', email: '' })
    }
  }

  sendCourseStudentsList() {
    this._api.sendCourseStudentsList(this.courseId, this.studentDetails)
      .subscribe(res => {
      });
  }
}
