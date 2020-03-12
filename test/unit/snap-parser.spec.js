describe('SNAP Parser', () => {

  let resultHandle;
  let htmlToParse;

  beforeAll(async (done) => {
    await global.setupPage('<body></body>');
    done();
  });

  beforeEach(async (done) => {
    resultHandle = await page.evaluateHandle(
      (hmtl) => window.snap.parser.getElementsToLoad(hmtl),
      htmlToParse
    );
    done();
  });

  afterEach(async (done) => {
    htmlToParse = undefined;
    await resultHandle.dispose();
    done();
  });

  describe(`when the HTML has a body tag`, () => {

    beforeAll(() => {
      htmlToParse = `
        <html>
          <body>
            <h1>title</h1>
            <p>content</p>
          </body>
        </html>`;
    });

    it(`returns a list containing all html body's children`,
      async () => {
        expect(await page.evaluate((elements)=>elements.length, resultHandle)).toBe(5);
        expect(await page.evaluate((elements)=>elements[0].nodeType, resultHandle)).toBe(3);
        expect(await page.evaluate((elements)=>elements[1].tagName, resultHandle)).toBe('h1');
        expect(await page.evaluate((elements)=>elements[2].nodeType, resultHandle)).toBe(3);
        expect(await page.evaluate((elements)=>elements[3].tagName, resultHandle)).toBe('p');
        expect(await page.evaluate((elements)=>elements[4].nodeType, resultHandle)).toBe(3);
      }
    );
  });

  describe(`when the HTML has no body tag`, () => {

    beforeAll(() => {
      htmlToParse = `<html><header></header></html>`;
    });

    it(`returns an empty list of elements`,
      async () => {
        expect(await page.evaluate((elements)=>elements.length, resultHandle)).toBe(0);
      }
    );
  });

});
