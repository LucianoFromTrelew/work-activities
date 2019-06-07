import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCreatePageComponent } from './activity-create-page.component';

describe('ActivityCreatePageComponent', () => {
  let component: ActivityCreatePageComponent;
  let fixture: ComponentFixture<ActivityCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
