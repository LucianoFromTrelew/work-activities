import passport from "passport";
import { Strategy } from "passport-http-bearer";
import User from "../models/user.model";

passport.use(
  new Strategy(async function(apiToken, callback) {
    try {
      const user = await User.findOne({ apiToken });
      if (!user) {
        return callback(null, false);
      }
      return callback(null, user);
    } catch (error) {
      return callback(error);
    }
  })
);

export default passport;
