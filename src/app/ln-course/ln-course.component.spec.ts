import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LnCourseComponent } from './ln-course.component';

describe('LnCourseComponent', () => {
  let component: LnCourseComponent;
  let fixture: ComponentFixture<LnCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LnCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LnCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
