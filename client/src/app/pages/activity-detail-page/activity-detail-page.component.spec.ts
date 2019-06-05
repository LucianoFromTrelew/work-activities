import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailPageComponent } from './activity-detail-page.component';

describe('ActivityDetailPageComponent', () => {
  let component: ActivityDetailPageComponent;
  let fixture: ComponentFixture<ActivityDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
