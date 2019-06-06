import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush
} from "@angular/core/testing";

import { ActivityCardComponent } from "./activity-card.component";
import { MatCardModule, MatChipsModule } from "@angular/material";
import { getFakeActivities } from "src/app/pages/utils/testing";
import { Activity } from "src/app/models/activity";
import { By } from "@angular/platform-browser";
import { CdkHeaderRowDef } from "@angular/cdk/table";
import { DebugElement } from "@angular/core";

describe("ActivityCardComponent", () => {
  let component: ActivityCardComponent;
  let fixture: ComponentFixture<ActivityCardComponent>;
  let activityCardDe: DebugElement;
  let deleteBtnDe: DebugElement;
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
    deleteBtnDe = fixture.debugElement.query(
      By.css("[data-testid='delete-btn']")
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

  it("should call 'onDeleteClick' when click the delete button", () => {
    const onDeleteClickSpy = jasmine.createSpy("onDeleteClickSpy");
    component.onDeleteClick = onDeleteClickSpy;
    deleteBtnDe.triggerEventHandler("click", null);
    expect(onDeleteClickSpy).toHaveBeenCalled();
  });

  it("should emit 'delete' event on delete button click", () => {
    let expectedActivity: Activity;
    component.delete.subscribe(activity => (expectedActivity = activity));
    deleteBtnDe.triggerEventHandler("click", null);
    expect(expectedActivity).toEqual(fakeActivity);
  });
});
