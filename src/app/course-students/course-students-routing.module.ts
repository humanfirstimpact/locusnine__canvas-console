import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseStudentsComponent } from './course-students.component';

const routes: Routes = [
  { path: '', component: CourseStudentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseStudentsRoutingModule { }
