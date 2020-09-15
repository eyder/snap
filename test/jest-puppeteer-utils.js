
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
  return await global.nthChild$(parent, 0);
}

global.lastChild$ = async (selector) => {
  const parent = await page.$(selector);
  const length = await page.evaluate((parent)=>parent.childNodes.length, parent);
  const lastChild = await global.nthChild$(parent, length - 1);
  if ((await global.isEmptyTextNode(lastChild)) && length > 1) {
    return await global.nthChild$(parent, length - 2);
  } else {
    return lastChild;
  }
}

global.nthChild$ = async (parent, n) => {
  return await page.evaluateHandle(
    (parent, n) => parent.childNodes[n],
    parent, n
  );
}

global.isEmptyTextNode = async (node) => {
  const nodeValue = await page.evaluate((node)=>node.nodeValue, node);
  const nodeType = await page.evaluate((node)=>node.nodeType, node);
  return nodeType === 3 && nodeValue.trim() === '';
}
