
describe('SNAP navs', () => {

  let currentPageHTML;
  let mocks;

  beforeEach(async (done) => {
    await global.setupPage(currentPageHTML);
    await global.mockRequests(page, mocks);
    done();
  });

  describe(`when the current page has a nav with data-snap-target`, () => {

    beforeAll(() => {
      currentPageHTML = `
        <head>
          <base href="http://localhost:8080" />
        </head>
        <body>
          <article>
            <h1>Main content</h1>
            <p>For some reason we dont want to reload this content every time we change the details aside...</p>
          </article>
          <aside id="details">
            <nav data-snap-target="#details">
              <a href="./notes" id="notes-link">Notes</a>
              <a href="./users" id="users-link">Users</a>
            </nav>
          </aside>
        </body>`;
    });

    describe(`and clicking on a nav link returns 200 and a valid HTML`, () => {

      beforeAll(() => {
        mocks = [{
          url: '/notes',
          status: 200,
          body: `
          <html>
            <body>
              <nav data-snap-target="#details">
                <a href="./notes" id="notes-link" class="active">Notes</a>
                <a href="./users" id="users-link">Users</a>
              </nav>
              <h2>Notes</h2>
              <p>All notes for this content...</p>
              <!-- Result may include comments -->
              and text nodes too
            </body>
          </html>`
        }];
      });

      describe(`when the user clicks on a nav link`, () => {

        beforeEach(async (done) => {
          await page.click('#notes-link');
          done();
        });

        it('replaces the target with response body', async () => {
          (await global.expect$('aside#details h2')).not.toBeNull();
        });
      });
    });
  });
});
