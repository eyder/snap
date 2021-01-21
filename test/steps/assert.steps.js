const { cucumber } = require('gherkin-jest');

cucumber.defineRule('I see a {string} with content {string}', async (world, tag, content) => {
  (await global.expect$Content(tag)).toBe(content);
});

cucumber.defineRule('I don\'t see a {string}', async (world, tag) => {
  (await global.expect$(tag)).toBeNull();
});

cucumber.defineRule('I see a {string} with content {string} as the {string} child of {string}', async (world, tag, content, firstOrLast, parentId) => {
  const childHandle = await global.child$(firstOrLast, `#${parentId}`);
  expect(await page.evaluate((child)=>child.nodeType, childHandle)).toBe(1);
  expect(await page.evaluate((child)=>child.tagName.toLowerCase(), childHandle)).toBe(tag.toLowerCase());
  expect(await page.evaluate((child)=>child.innerHTML, childHandle)).toBe(content);
});

cucumber.defineRule('I see the text {string} as the {string} child of {string}', async (world, text, firstOrLast, parentId) => {
  const childHandle = await global.child$(firstOrLast, `#${parentId}`);
  expect(await page.evaluate((child)=>child.nodeType, childHandle)).toBe(3);
  expect(await page.evaluate((child)=>child.nodeValue.trim(), childHandle)).toBe(text.trim());
});

cucumber.defineRule('I see the comment {string} as the {string} child of {string}', async (world, text, firstOrLast, parentId) => {
  const childHandle = await global.child$(firstOrLast, `#${parentId}`);
  expect(await page.evaluate((child)=>child.nodeType, childHandle)).toBe(8);
  expect(await page.evaluate((child)=>child.nodeValue, childHandle)).toBe(text);
});

cucumber.defineRule('the form submission method is {string}', async (world, method) => {
  expect(world.request.method).toBe(method);
});

cucumber.defineRule('the form submission data contains {word}', async (world, data) => {
  expect(world.request.data).toContain(data);
});

cucumber.defineRule('I see that the link has the class {string}', async (world, cssClass) => {
  (await global.expect$('#link.'+cssClass)).not.toBeNull();
});

cucumber.defineRule('I see that the link doesn\'t have the class {string}', async (world, cssClass) => {
  (await global.expect$('#link.'+cssClass)).toBeNull();
});

cucumber.defineRule('I see that the form has the class {string}', async (world, cssClass) => {
  (await global.expect$('#form.'+cssClass)).not.toBeNull();
});

cucumber.defineRule('I see that {string} has the class {string}', async (world, selector, cssClass) => {
  (await global.expect$(selector+'.'+cssClass)).not.toBeNull();
});

cucumber.defineRule('I see that {string} doesn\'t have the class {string}', async (world, selector, cssClass) => {
  (await global.expect$(selector+'.'+cssClass)).toBeNull();
});
