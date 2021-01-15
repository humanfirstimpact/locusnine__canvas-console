import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ln-course',
  templateUrl: './ln-course.component.html',
  styleUrls: ['./ln-course.component.scss']
})
export class LnCourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
@Input() courseTitle: string;
@Input() courseInstructor: string;
@Input() courseDuration:string;
@Input() courseDate:string;
}
