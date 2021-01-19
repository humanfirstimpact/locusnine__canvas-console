import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  // { path: 'students', canActivate: [AuthenticationGuard], loadChildren: () => import('./course-students/course-students.module').then(m => m.CourseStudentsModule) },
  { path: 'courses', canActivate: [AuthenticationGuard], loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
  { path: 'courses/:courseId', canActivate: [AuthenticationGuard], loadChildren: () => import('./course-details/course-details.module').then(m => m.CourseDetailsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
