"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
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
const Activity = mongoose.model("Activity", activitySchema);
// activitySchema.method("filterByKeyword", function(
//   keywordList: String[]
// ): Boolean {
//   return keywordList.some((keyword: string) =>
//     this.toString().includes(keyword)
//   );
// });
exports.default = Activity;
//# sourceMappingURL=activity.model.js.map