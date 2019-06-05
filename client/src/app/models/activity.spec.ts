import { Activity } from "./activity";

describe("Activity", () => {
  it("should create an instance", () => {
    expect(
      new Activity(1, "some title", "some description", ["tags"], {
        latitude: 12,
        longitude: 21
      })
    ).toBeTruthy();
  });
});
