
global.expect$ = async (selector) => {
  return expect(await page.$(selector));
}

global.expect$Content = async (selector) => {
  const elHandle = await page.$(selector);
  if (!elHandle) throw new Error('Element not found with selector: ' + selector);
  const html = await page.evaluate(el => el.innerHTML, elHandle);
  return expect(html);
}

global.child$ = async (firstOrLast, selector) => {
  if (firstOrLast === 'first') {
    return global.firstChild$(selector);
  } else {
    return global.lastChild$(selector);
  }
}

global.firstChild$ = async (selector) => {
  const parent = await page.$(selector);
  return await page.evaluateHandle(
    (parent) => parent.childNodes[0],
    parent
  );
}

global.lastChild$ = async (selector) => {
  const parent = await page.$(selector);
  return await page.evaluateHandle(
    (parent) => parent.childNodes[parent.childNodes.length - 1],
    parent
  );
}

