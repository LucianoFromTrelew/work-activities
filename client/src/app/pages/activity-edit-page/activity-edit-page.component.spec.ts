import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEditPageComponent } from './activity-edit-page.component';

describe('ActivityEditPageComponent', () => {
  let component: ActivityEditPageComponent;
  let fixture: ComponentFixture<ActivityEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
