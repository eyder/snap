describe('SNAP DOM Parser', () => {

  let resultHandle;
  let htmlToParse;

  beforeAll(async (done) => {
    await global.setupPage('<body></body>');
    done();
  });

  beforeEach(async (done) => {
    resultHandle = await page.evaluateHandle(
      (hmtl) => window.snap.DOMParser.parseFromXMLString(hmtl),
      htmlToParse
    );
    done();
  });

  afterEach(async (done) => {
    htmlToParse = undefined;
    await resultHandle.dispose();
    done();
  });

  describe(`when the HTML body contains only one child and no data-snap-target`, () => {

    beforeAll(() => {
      htmlToParse = `
        <html>
          <body>
            <div>
              <h1>title</h1>
              <p>content</p>
            </div>
          </body>
        </html>`;
    });

    it(`returns an element with html body's first child`,
      async () => {
        expect(await page.evaluate((element)=>element.tagName, resultHandle)).toBe('div');
        expect(await page.evaluate((element)=>element.children[0].tagName, resultHandle)).toBe('h1');
        expect(await page.evaluate((element)=>element.children[1].tagName, resultHandle)).toBe('p');
      }
    );
  });
  describe(`when the HTML body contains more than one child and no data-snap-target`, () => {

    beforeAll(() => {
      htmlToParse = `
        <html>
          <body>
            <h1>title</h1>
            <p>content</p>
          </body>
        </html>`;
    });

    it(`returns an div element with html body's content inside`,
      async () => {
        expect(await page.evaluate((element)=>element.tagName, resultHandle)).toBe('div');
        expect(await page.evaluate((element)=>element.children[0].tagName, resultHandle)).toBe('h1');
        expect(await page.evaluate((element)=>element.children[1].tagName, resultHandle)).toBe('p');
      }
    );
  });
});
