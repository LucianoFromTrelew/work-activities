import { ActivitiesService } from "./activities.service";
import { asyncData } from "./utils/testing";

describe("ActivitiesService", () => {
  let httpClientStub: { get: any };
  let service: ActivitiesService;

  beforeEach(() => {
    const get = jasmine.createSpyObj("get", ["toPromise"]);
    httpClientStub.get = get;
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
    httpClientStub.get.toPromise.and.returnValue(asyncData(expectedData));
    service.getActivities().then(data => {
      expect(data).toEqual(expectedData, "expected data"), fail;
    });

    expect(httpClientStub.get.toPromise.calls.count()).toBe(1, "one call");
  });
});
