module.exports = {
  preset: "jest-puppeteer",
  setupFiles: [
    "./test/jest-puppeteer-utils.js",
    "./test/mock-requests.js",
    "./test/setup-page.js",
    "./test/steps/global.steps.js",
    "./test/steps/parser.steps.js",
    "./test/steps/selectors.steps.js",
    "./test/steps/unit.steps.js",
  ],
  testMatch: ["**/*.spec.js", "**/*.feature"],
  transform: {
    "^.+\\.feature$": "gherkin-jest"
  },
  moduleFileExtensions: ["js", "feature"],
};
