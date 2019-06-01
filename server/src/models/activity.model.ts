import { Typegoose, prop, instanceMethod, staticMethod } from "typegoose";
import { isArrayOfStrings } from "../utils";

class ActivityClass extends Typegoose {
  @prop({ required: true, unique: true })
  id: Number;
  @prop({ required: true })
  title: String;
  @prop({ required: true })
  description: String;
  @prop({ required: true, validate: isArrayOfStrings })
  tags: string[];
  @prop()
  geolocation: {
    latitude: Number;
    longitude: Number;
  };

  @instanceMethod
  filterByKeyword(keywordList: String[]): Boolean {
    return keywordList.some((keyword: string) =>
      this.toString().includes(keyword)
    );
  }

  @instanceMethod
  getTagIndex(tag: String): number {
    return this.tags.findIndex(savedTag => tag === tag);
  }

  @instanceMethod
  hasTag(tagToDelete: String): Boolean {
    return this.getTagIndex(tagToDelete) !== -1;
  }

  @instanceMethod
  removeTag(tagToDelete: String): void {
    // this.tags.splice(this.getTagIndex(tag), 1);
    this.tags = this.tags.filter(tag => tag !== tagToDelete);
  }

  @staticMethod
  static async getTags() {
    const tags = (await Activity.find({}, "tags")).map(
      activity => activity.tags
    );
    const flattenTags = [].concat(...tags);
    const onlyUniqueTags = new Set(flattenTags);
    return Array.from(onlyUniqueTags);
  }

  @staticMethod
  static async getActivitiesForTag(tag: String) {
    const activities = await Activity.find({ tags: tag });
    return activities;
  }
}

const Activity = new ActivityClass().getModelForClass(ActivityClass);

export default Activity;
