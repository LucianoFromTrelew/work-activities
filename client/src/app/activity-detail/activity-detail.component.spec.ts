import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivityDetailComponent } from "./activity-detail.component";
import { ActivatedRoute } from "@angular/router";

let activatedRouteStub: Partial<ActivatedRoute>;

activatedRouteStub = {};

describe("ActivityDetailComponent", () => {
  let component: ActivityDetailComponent;
  let fixture: ComponentFixture<ActivityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityDetailComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
