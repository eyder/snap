const { cucumber } = require('gherkin-jest');

cucumber.defineRule('I get an error', async (world) => {
  expect(world.resultError).toBeDefined();
});

cucumber.defineRule('I get a {string} with id {string} as result', async (world, tag, id) => {
  expect(await page.evaluate((target)=>target.tagName, world.resultHandle)).toBe(tag.toUpperCase());
  expect(await page.evaluate((target)=>target.getAttribute('id'), world.resultHandle)).toBe(id);
  world.resultHandle.dispose();
});

cucumber.defineRule('I get {int} items as result', async (world, count) => {
  expect(await page.evaluate((elements)=>elements.length, world.resultHandle)).toBe(count);
});

cucumber.defineRule('I get a {string} as item number {int}', async (world, tag, index) => {
  expect(await page.evaluate((elements, index)=>elements[index-1].tagName, world.resultHandle, index)).toBe(tag);
});

cucumber.defineRule('I get a comment as item number {int}', async (world, index) => {
  expect(await page.evaluate((elements, index)=>elements[index-1].nodeType, world.resultHandle, index)).toBe(8);
});

cucumber.defineRule('I get a text as item number {int}', async (world, index) => {
  expect(await page.evaluate((elements, index)=>elements[index-1].nodeType, world.resultHandle, index)).toBe(3);
});
