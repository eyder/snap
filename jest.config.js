module.exports = {
  preset: "jest-puppeteer",
  setupFiles: [
    "./test/jest-puppeteer-utils.js",
    "./test/mock-requests.js",
    "./test/setup-page.js",
    "./test/e2e/page.steps.js"
  ],
  testMatch: ["**/*.spec.js", "**/*.feature"],
  transform: {
    "^.+\\.feature$": "gherkin-jest"
  },
  moduleFileExtensions: ["js", "feature"],
};
