import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { CourseDetailsComponent } from './course-details.component';
import { CourseStudentsModule } from '../course-students/course-students.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CourseStudentsComponent } from '../course-students/course-students.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CourseDetailsComponent],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    CourseStudentsModule,
    MatTabsModule,
    MatChipsModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [CourseStudentsComponent]
})
export class CourseDetailsModule { }
