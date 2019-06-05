import { TestBed } from "@angular/core/testing";

import { ActivitiesService } from "./activities.service";
import { HttpClient } from "@angular/common/http";
import { defer } from "rxjs";

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe("ActivitiesService", () => {
  let httpClientStub: { get: jasmine.Spy };
  let service: ActivitiesService;

  beforeEach(() => {
    httpClientStub = jasmine.createSpyObj("HttpClient", ["get"]);
    service = new ActivitiesService(httpClientStub as any);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return correct data", () => {
    const expectedData: any = [
      { id: 1, name: "coso" },
      { id: 2, name: "otro" }
    ];
    httpClientStub.get.and.returnValue(asyncData(expectedData));
    service.getActivities().subscribe(data => {
      expect(data).toEqual(expectedData, "expected data"), fail;
    });

    expect(httpClientStub.get.calls.count()).toBe(1, "one call");
  });
});
