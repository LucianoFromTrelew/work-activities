import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivityDetailPageComponent } from "./activity-detail-page.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatDividerModule,
  MatChipsModule,
  MatDialogModule,
  MatSnackBarModule
} from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";

describe("ActivityDetailPageComponent", () => {
  let component: ActivityDetailPageComponent;
  let fixture: ComponentFixture<ActivityDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityDetailPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        MatSnackBarModule,
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
