import * as mongoose from "mongoose";
import IActivity from "../interfaces/activity.interface";

const activitySchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  tags: [String],
  geolocation: {
    latitude: Number,
    longitude: Number
  }
});

const Activity = mongoose.model<IActivity & mongoose.Document>(
  "Activity",
  activitySchema
);

// activitySchema.method("filterByKeyword", function(
//   keywordList: String[]
// ): Boolean {
//   return keywordList.some((keyword: string) =>
//     this.toString().includes(keyword)
//   );
// });

export default Activity;
