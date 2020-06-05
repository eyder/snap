const { cucumber } = require('gherkin-jest');

cucumber.defineRule('I ask for the target of the link', async (world) => {
  let link = await page.$('#link');
  world.resultHandle = await page.evaluateHandle(
    (element) => window.snap.selectors.findTarget(element),
    link
  );
});

cucumber.defineRule('I get a {string} with id {string} as result', async (world, tag, id) => {
  expect(await page.evaluate((target)=>target.tagName, world.resultHandle)).toBe(tag.toUpperCase());
  expect(await page.evaluate((target)=>target.getAttribute('id'), world.resultHandle)).toBe(id);
  world.resultHandle.dispose();
});




