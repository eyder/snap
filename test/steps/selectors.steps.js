const { cucumber } = require('gherkin-jest');

cucumber.defineRule('I ask for the target of the link', async (world) => {
  let link = await page.$('#link');
  world.resultHandle = await page.evaluateHandle(
    (element) => window.snap.selectors.findTarget(element),
    link
  );
});
