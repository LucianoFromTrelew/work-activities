import * as faker from "faker";
import { Activity } from "src/app/models/activity";

export const getFakeActivities = (qty: number = 1): Activity[] => {
  let activities = [];
  for (let i = 0; i < qty; i++) {
    activities.push(
      new Activity(
        i,
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        [faker.lorem.word()],
        {
          latitude: faker.random.number(),
          longitude: faker.random.number()
        }
      )
    );
  }
  return activities;
};
