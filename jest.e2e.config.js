/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.ts", "!test/**/*.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js)$": "ts-jest",
  },
  transformIgnorePatterns: [],
  testMatch: ["<rootDir>/test/e2e/*.test.(ts|js)"],
}
