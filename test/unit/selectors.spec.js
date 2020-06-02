describe('Selectors', () => {

  let currentPageHTML;
  let resultHandle;
  let triggerElementSelector;

  beforeEach(async (done) => {
    await global.setupPage(currentPageHTML);
    let triggerElement = await page.$(triggerElementSelector);
    resultHandle = await page.evaluateHandle(
      (element) => window.snap.selectors.findTarget(element),
      triggerElement
    );
    done();
  });

  afterEach(async (done) => {
    triggerElementSelector = undefined;
    await resultHandle.dispose();
    done();
  });

  describe(`when the current page has a link with data-snap-target`, () => {

    beforeAll(() => {
      currentPageHTML = `
        <html>
          <body>
            <a href="./load" id="load-link" data-snap-target="#section-1">Load section</a>
            <article id="article">
              <section id="section-1"></section>
              <section id="section-2"></section>
              <footer id="footer"></footer>
            </article>
          </body>
        </html>`;
    });

    describe(`when we ask for the target of the link element`, () => {

      beforeAll(() => {
        triggerElementSelector = "#load-link";
      });

      it(`returns the first element that satisfies the data-snap-target query selector`,
        async () => {
          expect(await page.evaluate((target)=>target.tagName, resultHandle)).toBe('SECTION');
          expect(await page.evaluate((target)=>target.getAttribute('id'), resultHandle)).toBe('section-1');
        }
      );
    });
  });
});
