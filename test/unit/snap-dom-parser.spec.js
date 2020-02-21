
const completeHTMLWithOneChildInBody = `
<html>
  <head>
    <base href="http://localhost:8080" />
  </head>
  <body>
    <div>
      <h1>title</h1>
      <p>content</p>
    </div>
  </body>
</html>
`;

const completeHTML = `
<html>
  <head>
    <base href="http://localhost:8080" />
  </head>
  <body>
    <h1>title</h1>
    <p>content</p>
  </body>
</html>
`;

const simpleContentHTML = `
<div>
  <h1>title</h1>
  <p>content</p>
</div>
`;

const invalidHTMLWithoutRootTag = `
<h1>title</h1>
<p>content</p>
`

describe('SNAP DOM Parser', () => {
  beforeAll(async (done) => {
    await global.setupPage('<body></body>');
    done();
  });
  it(`returns a document with html body first child
      when the HTML body contains only one child
      and no data-snap-target attribute is present in the whole body`,
    async () => {
      const elementHandle = await page.evaluateHandle(
        (hmtl) => window.snap.DOMParser.parseFromXMLString(hmtl),
        completeHTMLWithOneChildInBody
      );
      expect(await page.evaluate((element)=>element.tagName, elementHandle)).toBe('div');
      expect(await page.evaluate((element)=>element.children[0].tagName, elementHandle)).toBe('h1');
      expect(await page.evaluate((element)=>element.children[1].tagName, elementHandle)).toBe('p');
      await elementHandle.dispose();
    }
  );
});
