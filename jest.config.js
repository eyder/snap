module.exports = {
  preset: "jest-puppeteer",
  setupFiles: [
    "./test/jest-puppeteer-utils.js",
    "./test/mock-requests.js",
    "./test/setup-page.js",
    "./test/page-builder.js",
    "./test/steps/arrange.steps.js",
    "./test/steps/page-act.steps.js",
    "./test/steps/page-assert.steps.js",
    "./test/steps/unit-act.steps.js",
    "./test/steps/unit-assert.steps.js",
  ],
  testMatch: ["**/*.spec.js", "**/*.feature"],
  transform: {
    "^.+\\.feature$": "gherkin-jest"
  },
  moduleFileExtensions: ["js", "feature"],
};
