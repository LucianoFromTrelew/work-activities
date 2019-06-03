import { Typegoose, prop, instanceMethod, staticMethod, pre } from "typegoose";
import { hashPassword } from "../utils";
import { generate } from "randomstring";

@pre<UserClass>("save", function(next) {
  if (!this.isNew) return next();
  this.password = hashPassword(this.password);
  next();
})
class UserClass extends Typegoose {
  @prop({ required: true, unique: true })
  username: string;
  @prop({ required: true })
  password: string;
  @prop()
  apiToken: string;

  @instanceMethod
  generateApiToken(): string {
    this.apiToken = generate();
    return this.apiToken;
  }

  @instanceMethod
  clearApiToken(): void {
    this.apiToken = "";
  }

  @instanceMethod
  getAuthHeader(): string {
    if (this.apiToken) return `Bearer ${this.apiToken}`;
    return "";
  }

  @staticMethod
  static async getUserByUsernameAndPassword(
    username: string,
    clearPassword: string
  ) {
    const password = hashPassword(clearPassword);
    const user = await User.findOne({ username, password });
    return user;
  }
}

const User = new UserClass().getModelForClass(UserClass);

export default User;
