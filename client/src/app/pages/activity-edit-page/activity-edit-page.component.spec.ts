import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivityEditPageComponent } from "./activity-edit-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe("ActivityEditPageComponent", () => {
  let component: ActivityEditPageComponent;
  let fixture: ComponentFixture<ActivityEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule
      ],
      declarations: [ActivityEditPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: of({ id: 123 }) }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
