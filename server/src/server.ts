import getApp from "./app";
import "dotenv/config";

const { EXPRESS_PORT } = process.env;
const run = async () => {
  (await getApp()).listen(EXPRESS_PORT, () => {
    console.log(`[Express] Listening on port ${EXPRESS_PORT}`);
  });
};

run();
