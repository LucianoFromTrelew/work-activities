module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testEnvironment: "node"
};
