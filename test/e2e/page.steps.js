const { cucumber } = require('gherkin-jest');

cucumber.defineCreateWorld(() => {
  return {
    pageHTML: `
      <head>
        <base href="http://localhost:8080"/>
      </head>
      <body>
      </body>`,
    responseHTML: `
      <html>
        <body>
        </body>
      </html>`
  }
})

cucumber.defineRule('the page has a link with data-snap-target {string}', (world, target) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <a href="./link" id="link" data-snap-target="${target}">Link</a>
    </body>`
  );
});

cucumber.defineRule('the page has a nav with data-snap-target {string} and a link inside', (world, target) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <nav data-snap-target="${target}">
        <a href="./link" id="link">Link</a>
        <a href="./another-link" id="another-link">Another link</a>
      </nav>
    </body>`
  );
});

cucumber.defineRule('the page has a {string} div', (world, id) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <div id="${id}">${id}</div>
    </body>`
  );
});

cucumber.defineRule('the link response has a {string} with content {string}', (world, tag, content) => {
  world.responseHTML = world.responseHTML.replace(
    '</body>',
    ` <${tag}>${content}</${tag}>
    </body>`
  );
});

cucumber.defineRule('I visit the page', async (world) => {
  await global.setupPage(world.pageHTML);
  await global.mockRequests(page, [{
    url: '/link',
    status: 200,
    body: world.responseHTML
  }]);
});

cucumber.defineRule('I click on the link', async (world) => {
  await page.click('#link');
});

cucumber.defineRule('I see a {string} with content {string} as the last child of {string}', async (world, tag, content, parentId) => {
  (await global.expect$Content(`#${parentId} ${tag}`)).toBe(content);
});





