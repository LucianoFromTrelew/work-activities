import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivityCreatePageComponent } from "./activity-create-page.component";
import {
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ActivityCreatePageComponent", () => {
  let component: ActivityCreatePageComponent;
  let fixture: ComponentFixture<ActivityCreatePageComponent>;

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
      declarations: [ActivityCreatePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
