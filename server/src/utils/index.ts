const isArrayOfStrings = (arr: String[]) => {
  return arr.every(val => typeof val === "string");
};

export { isArrayOfStrings };
