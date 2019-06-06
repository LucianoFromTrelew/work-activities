import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivityListComponent } from "./activity-list.component";
import { ActivityCardComponent } from "../activity-card/activity-card.component";
import { MatCardModule, MatChipsModule } from "@angular/material";
import { getFakeActivities } from "src/app/pages/utils/testing";
import { Activity } from "src/app/models/activity";

describe("ActivityListComponent", () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  const data = getFakeActivities(3);
  let activityCard: ActivityCardComponent;
  let selectedActivity: Activity;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityListComponent, ActivityCardComponent],
      imports: [MatCardModule, MatChipsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    component.activities = data;
    fixture.detectChanges();
    activityCard = component.activityCards.toArray()[0];
  });

  afterEach(() => {
    activityCard = null;
    selectedActivity = null;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render correctly", () => {
    expect(
      fixture.nativeElement.querySelectorAll(".activity-card").length
    ).toBe(data.length);
  });

  it("should emit 'selected' event on some card click", () => {
    component.selected.subscribe(activity => (selectedActivity = activity));
    activityCard.onCardClick();
    expect(selectedActivity).toEqual(activityCard.activity);
  });
});
