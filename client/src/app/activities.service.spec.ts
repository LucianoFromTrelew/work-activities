import { ActivitiesService } from "./activities.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { getFakeActivities } from "./utils/testing";

const expectedData = getFakeActivities(2);

describe("ActivitiesService", () => {
  let service: ActivitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
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
    service.getActivities().subscribe(activities => {
      expect(activities).toBe(expectedData);
    });

    const requestWrapper = httpMock.expectOne(service.getUrl());

    expect(requestWrapper.request.method).toBe("GET");

    requestWrapper.flush(expectedData);
  });

  it("should return correctly an activity by id", () => {
    const id = 1;

    service.getActivityById(id).subscribe(activity => {
      expect(activity).toEqual(expectedData[0]);
    });

    const requestWrapper = httpMock.expectOne(service.getUrl(id));

    expect(requestWrapper.request.method).toBe("GET");

    requestWrapper.flush(expectedData[0]);
  });
});
