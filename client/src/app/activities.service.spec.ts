import { ActivitiesService } from "./activities.service";
import { fakeAsync, flush, tick } from "@angular/core/testing";

describe("ActivitiesService", () => {
  let httpClientStub;
  let service: ActivitiesService;
  const expectedData = [
    {
      id: 1,
      title: "some title",
      description: "some description",
      tags: ["tags"],
      geolocation: { latitude: 12, longitude: 21 }
    }
  ];

  beforeEach(() => {
    httpClientStub = jasmine.createSpyObj("HttpClient", ["get"]);
    httpClientStub.get = jasmine.createSpy().and.returnValue({
      toPromise: jasmine
        .createSpy()
        .and.returnValue(new Promise(resolve => expectedData))
    });
    service = new ActivitiesService(httpClientStub as any);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return correct data", fakeAsync(() => {
    service.getActivities().then(data => {
      expect(data).toEqual(expectedData, "expected data"), fail;
    });
    expect(httpClientStub.get.calls.count()).toBe(1, "one call");
  }));

  it("should not make a second http call if it already has activities", fakeAsync(() => {
    service
      .getActivities()
      .then(data => service.getActivities())
      .then(data => {});

    flush();
    expect(httpClientStub.get.calls.count()).toBeLessThan(
      2,
      "no more than one call"
    );
  }));
});
