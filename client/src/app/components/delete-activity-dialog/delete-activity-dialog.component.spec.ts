import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DeleteActivityDialogComponent } from "./delete-activity-dialog.component";
import { MatDialogModule, MatDialogRef } from "@angular/material";

describe("DeleteActivityDialogComponent", () => {
  let component: DeleteActivityDialogComponent;
  let fixture: ComponentFixture<DeleteActivityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [DeleteActivityDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
