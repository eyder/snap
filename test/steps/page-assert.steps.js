const { cucumber } = require('gherkin-jest');

cucumber.defineRule('I see a {string} with content {string}', async (world, tag, content) => {
  (await global.expect$Content(tag)).toBe(content);
});

cucumber.defineRule('I don\'t see a {string}', async (world, tag) => {
  (await global.expect$(tag)).toBeNull();
});

cucumber.defineRule('I see a {string} with content {string} as the {string} child of {string}', async (world, tag, content, firstOrLast, parentId) => {
  const childHandle = await global.child$(firstOrLast, `#${parentId}`);
  expect(await page.evaluate((lastChild)=>lastChild.tagName, childHandle)).toBe(tag);
  expect(await page.evaluate((lastChild)=>lastChild.innerHTML, childHandle)).toBe(content);
});

cucumber.defineRule('I see the text {string} as the {string} child of {string}', async (world, text, firstOrLast, parentId) => {
  const childHandle = await global.child$(firstOrLast, `#${parentId}`);
  expect(await page.evaluate((lastChild)=>lastChild.nodeValue, childHandle)).toBe(text);
});
