import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivityDetailPageComponent } from "./activity-detail-page.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatDividerModule,
  MatChipsModule
} from "@angular/material";

describe("ActivityDetailPageComponent", () => {
  let component: ActivityDetailPageComponent;
  let fixture: ComponentFixture<ActivityDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityDetailPageComponent],
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatDividerModule,
        MatChipsModule
      ],
      providers: [{ provide: ActivatedRoute, useValue: of({ id: 123 }) }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
