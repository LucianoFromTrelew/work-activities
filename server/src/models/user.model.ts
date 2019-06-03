import { Typegoose, prop, instanceMethod, staticMethod } from "typegoose";

class UserClass extends Typegoose {
  @prop({ required: true, unique: true })
  username: String;
  @prop({ required: true })
  password: String;
  @prop()
  apiToken: String;
}

const User = new UserClass().getModelForClass(UserClass);

export default User;
