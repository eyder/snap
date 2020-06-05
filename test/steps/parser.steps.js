/* eslint-disable require-atomic-updates */
const { cucumber } = require('gherkin-jest');

cucumber.defineRule('I ask for the parsed nodes of the server response', async (world) => {
  try {
    world.resultHandle = await page.evaluateHandle(
      (response) => window.snap.parser.getNodesToLoad(response),
      world.responseHTML
    );
  } catch (e) {
    world.resultError = e;
  }
});
