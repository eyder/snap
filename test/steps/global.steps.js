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
        <body></body>
      </html>`,
    resultHandle: undefined,
    resultError: undefined,
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

cucumber.defineRule('the page has a {string} div with class {string}', (world, id, clazz) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <div id="${id}" class="${clazz}">${id}</div>
    </body>`
  );
});

cucumber.defineRule('the server response has a {string} with content {string}', (world, tag, content) => {
  world.responseHTML = world.responseHTML.replace(
    '</body>',
    `<${tag}>${content}</${tag}></body>`
  );
});

cucumber.defineRule('the server response has a comment {string}', (world, comment) => {
  world.responseHTML = world.responseHTML.replace(
    '</body>',
    `<!--${comment}--></body>`
  );
});

cucumber.defineRule('the server response has the text {string}', (world, text) => {
  world.responseHTML = world.responseHTML.replace(
    '</body>',
    `${text}</body>`
  );
});

cucumber.defineRule('the server response is {string}', (world, html) => {
  world.responseHTML = html;
});


cucumber.defineRule(/I visit (the|a) page/, async (world) => {
  await global.setupPage(world.pageHTML);
  await global.mockRequests(page, [{
    url: '/link',
    status: 200,
    body: world.responseHTML
  }]);
});

cucumber.defineRule('I click on the link', async () => {
  await page.click('#link');
});

cucumber.defineRule('I see a {string} with content {string} as the last child of {string}', async (world, tag, content, parentId) => {
  (await global.expect$Content(`#${parentId} ${tag}`)).toBe(content);
});





