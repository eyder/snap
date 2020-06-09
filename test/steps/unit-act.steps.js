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

cucumber.defineRule('I ask for the target of the link', async (world) => {
  let link = await page.$('#link');
  world.resultHandle = await page.evaluateHandle(
    (element) => window.snap.selectors.findTarget(element),
    link
  );
});

cucumber.defineRule('I ask for the mode of the link', async (world) => {
  let link = await page.$('#link');
  world.resultHandle = await page.evaluateHandle(
    (element) => window.snap.selectors.getMode(element),
    link
  );
});
