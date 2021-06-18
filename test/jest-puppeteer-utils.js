
global.expect$ = async (selector) => {
  return expect(await page.$(selector));
}

global.expect$Content = async (selector) => {
  const elHandle = await page.$(selector);
  if (!elHandle) throw new Error('Element not found with selector: ' + selector);
  const html = await page.evaluate(el => el.innerHTML, elHandle);
  return expect(html);
}

global.nonEmptyChildCount$ = async (selector) => {
  const parent = await page.$(selector);
  const length = await page.evaluate((parent)=>parent.childNodes.length, parent);
  let i = 0;
  let count = 0;
  do {
    child = await global.nthChild$(parent, i++);
    if (!(await global.isEmptyTextNode(child))) {
      count++;
    }
  } while (i < length);
  return count;
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
  const length = await page.evaluate((parent)=>parent.childNodes.length, parent);
  let i = 0;
  let child;
  do {
    child = await global.nthChild$(parent, i++);
  } while (i < length && (await global.isEmptyTextNode(child)));
  return child;
}

global.lastChild$ = async (selector) => {
  const parent = await page.$(selector);
  const length = await page.evaluate((parent)=>parent.childNodes.length, parent);
  let i = length - 1;
  let child;
  do {
    child = await global.nthChild$(parent, i--);
  } while (i >= 0 && (await global.isEmptyTextNode(child)));
  return child;
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
