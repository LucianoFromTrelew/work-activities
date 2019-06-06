import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { ActivityListPageComponent } from "./activity-list-page.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatChipsModule
} from "@angular/material";
import { ActivityListComponent } from "src/app/components/activity-list/activity-list.component";
import { ActivitiesService } from "src/app/activities.service";
import { ActivityCardComponent } from "src/app/components/activity-card/activity-card.component";
import { getFakeActivities } from "../../utils/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("ActivityListPageComponent", () => {
  const data = getFakeActivities(3);
  let component: ActivityListPageComponent;
  let fixture: ComponentFixture<ActivityListPageComponent>;

  beforeEach(async(() => {
    const activitiesServiceMock = jasmine.createSpyObj("ActivitiesService", [
      "getActivities"
    ]);
    activitiesServiceMock.getActivities.and.returnValue(
      new Promise(resolve => resolve(data))
    );
    TestBed.configureTestingModule({
      declarations: [
        ActivityListPageComponent,
        ActivityListComponent,
        ActivityCardComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatChipsModule
      ],
      providers: [
        { provide: ActivitiesService, useValue: activitiesServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListPageComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("shoud render an spinner while fetching data", fakeAsync(() => {
    expect(
      fixture.nativeElement.querySelector("[data-testid='spinner']")
    ).toBeDefined();
    fixture.detectChanges(); // onInit()
    tick();
    fixture.detectChanges(); // has activities - remove spinner
    expect(
      fixture.nativeElement.querySelector("[data-testid='spinner']")
    ).toBeNull();
  }));

  it("should get activities", fakeAsync(() => {
    expect(component.hasActivities()).toBeFalsy();
    fixture.detectChanges(); // onInit()
    tick();
    expect(component.hasActivities()).toBeTruthy();
  }));

  it("should render as many cards as activities", fakeAsync(() => {
    fixture.detectChanges(); // onInit()
    tick();
    fixture.detectChanges(); // update UI
    expect(
      fixture.nativeElement.querySelectorAll(".activity-card").length
    ).toBe(data.length);
  }));
});
