import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivityCardComponent } from "./activity-card.component";
import { MatCardModule, MatChipsModule } from "@angular/material";
import { getFakeActivities } from "src/app/pages/utils/testing";
import { Activity } from "src/app/models/activity";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe("ActivityCardComponent", () => {
  let component: ActivityCardComponent;
  let fixture: ComponentFixture<ActivityCardComponent>;
  let activityCardDe: DebugElement;
  const fakeActivity = getFakeActivities()[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityCardComponent],
      imports: [MatCardModule, MatChipsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCardComponent);
    component = fixture.componentInstance;
    component.activity = fakeActivity;
    activityCardDe = fixture.debugElement.query(
      By.css("[data-testid='activity-card']")
    );
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call 'onCardClick' when clicking the card", () => {
    const onCardClickSpy = jasmine.createSpy("onCardClick");
    component.onCardClick = onCardClickSpy;
    activityCardDe.triggerEventHandler("click", null);
    expect(onCardClickSpy).toHaveBeenCalled();
  });

  it("should emit 'selected' event on card click", () => {
    let expectedActivity: Activity;
    component.selected.subscribe(activity => (expectedActivity = activity));
    activityCardDe.triggerEventHandler("click", null);
    expect(expectedActivity).toEqual(fakeActivity);
  });
});
