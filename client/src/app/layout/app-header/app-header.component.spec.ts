import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppHeaderComponent } from "./app-header.component";
import { MatToolbarModule } from "@angular/material";

describe("AppHeaderComponent", () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [AppHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a title", () => {
    const title = "Test title";
    component.title = title;
    fixture.detectChanges();
    const renderedTitle = fixture.debugElement.nativeElement.querySelector(
      "[data-testid='toolbar-title']"
    ).textContent;
    expect(renderedTitle).toContain(title);
  });
});
