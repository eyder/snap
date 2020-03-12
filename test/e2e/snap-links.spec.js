
describe('SNAP links', () => {

  let currentPageHTML;
  let mocks;

  beforeEach(async (done) => {
    await global.setupPage(currentPageHTML);
    await global.mockRequests(page, mocks);
    done();
  });

  describe(`when the current page has a link with data-snap-target`, () => {

    beforeAll(() => {
      currentPageHTML = `
        <head>
          <base href="http://localhost:8080" />
        </head>
        <body>
          <article>
            <h1>Main content</h1>
            <section id="part-1">
              <p>The first part of this article...</p>
            </section>
            <a href="./part-2" id="part-2-link" data-snap-target="#part-2">Read more</a>
            <section id="part-2">
            </section>
          </article>
        </body>`;
    });

    describe(`and clicking on the link returns 200 and a valid HTML`, () => {

      beforeAll(() => {
        mocks = [{
          url: '/part-2',
          status: 200,
          body: `<html><body><p>The second part of this article...</p></body></html>`
        }];
      });

      describe(`when the user clicks on the link`, () => {

        beforeEach(async (done) => {
          await page.click('#part-2-link');
          done();
        });

        it('replaces the target with response body', async () => {
          (await global.expect$('article section#part-2 p')).not.toBeNull();
        });
      });
    });
  });
});
