import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CourseStudentsRoutingModule } from './course-students-routing.module';
import { CourseStudentsComponent } from './course-students.component';

@NgModule({
  declarations: [CourseStudentsComponent],
  imports: [
    CommonModule,
    CourseStudentsRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  exports: [
    CourseStudentsComponent
  ]
})
export class CourseStudentsModule { }
