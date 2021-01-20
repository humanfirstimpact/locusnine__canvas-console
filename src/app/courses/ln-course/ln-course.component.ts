import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ln-course',
  templateUrl: './ln-course.component.html',
  styleUrls: ['./ln-course.component.scss']
})
export class LnCourseComponent implements OnInit {

  @Input() courseTitle: string;
  @Input() courseInstructor: string;
  @Input() courseDuration: string;
  @Input() courseDate: string;
  @Input() courseImage: string;
  @Input() courseCost:number;
  constructor() { }

  ngOnInit(): void {
  }
}
