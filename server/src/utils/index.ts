import { hashPassword } from "./hash";

const isArrayOfStrings = (arr: String[]) => {
  return arr.every(val => typeof val === "string");
};

export { isArrayOfStrings, hashPassword };
