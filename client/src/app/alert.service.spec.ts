import { TestBed } from "@angular/core/testing";

import { AlertService } from "./alert.service";
import { MatSnackBarModule } from "@angular/material";

describe("AlertService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule]
    })
  );

  it("should be created", () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });
});
