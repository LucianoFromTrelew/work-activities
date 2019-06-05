import { ActivitiesService } from "./activities.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { fakeAsync, flush, tick, TestBed, inject } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";

const expectedData = [
  {
    id: 1,
    title: "some title",
    description: "some description",
    tags: ["tags"],
    geolocation: { latitude: 12, longitude: 21 }
  },
  {
    id: 2,
    title: "some other title",
    description: "some other description",
    tags: ["other", "tags"],
    geolocation: { latitude: 12, longitude: 21 }
  }
];
describe("ActivitiesService", () => {
  let service: ActivitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivitiesService]
    });

    service = TestBed.get(ActivitiesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be initialized", () => {
    expect(service).toBeTruthy();
  });

  it("should return correct data", () => {
    service.getActivities().then(activities => {
      expect(activities).toBe(expectedData);
    });

    const requestWrapper = httpMock.expectOne(
      "http://localhost:5000/api/activity"
    );

    expect(requestWrapper.request.method).toBe("GET");

    requestWrapper.flush(expectedData);
  });

  it("should return correctly an activity by id", () => {
    const id = 1;

    service.getActivityById(id).then(activity => {
      expect(activity).toEqual(expectedData[0]);
    });

    const requestWrapper = httpMock.expectOne(
      `http://localhost:5000/api/activity/${id}`
    );

    expect(requestWrapper.request.method).toBe("GET");

    requestWrapper.flush(expectedData[0]);
  });
});

describe("ActivitiesService 2", () => {
  let service;
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpyObj("HttpClient mock", ["get"]);
    spy.get = jasmine.createSpy().and.returnValue({
      toPromise: jasmine
        .createSpy()
        .and.returnValue(new Promise(resolve => resolve(expectedData)))
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivitiesService, { provide: HttpClient, useValue: spy }]
    });

    service = TestBed.get(ActivitiesService);
  });

  it("should only be making one http request on getActivities", fakeAsync(() => {
    service
      .getActivities()
      .then(_ => {
        return service.getActivities();
      })
      .then(_ => {});

    tick();
    expect(spy.get.calls.count()).toBeLessThan(2);
  }));
});
