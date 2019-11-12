
global.expect$ = async (selector) => {
  return expect(await page.$(selector));
}

global.expect$Content = async (selector) => {
  const elHandle = await page.$(selector);
  if (!elHandle) throw new Error('Element not found with selector: ' + selector);
  const html = await page.evaluate(el => el.innerHTML, elHandle);
  return expect(html);
}
