module.exports = {
  preset: "jest-puppeteer",
  setupFiles: [
    "./test/jest-puppeteer-utils.js",
    "./test/mock-requests.js",
    "./test/setup-page.js",
    "./test/page-builder.js",
    "./test/steps/arrange.steps.js",
    "./test/steps/act.steps.js",
    "./test/steps/assert.steps.js",
  ],
  testMatch: ["**/*.spec.js", "**/*.feature"],
  transform: {
    "^.+\\.feature$": "gherkin-jest"
  },
  moduleFileExtensions: ["js", "feature"],
};
