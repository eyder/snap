const { cucumber } = require('gherkin-jest');
const { HookType } = require('stucumber');

cucumber.addHook(HookType.BeforeScenarios, (world) => {
  world.requestURL = '/link-' + Date.now();
});

cucumber.defineCreateWorld(() => {
  return {
    pageHTML: `
      <head>
        <base href="http://localhost:8080"/>
      </head>
      <body>
      </body>`,
    requestURL: '/link',
    responseHTML: `
      <html>
        <body></body>
      </html>`,
    resultHandle: undefined,
    resultError: undefined,
  }
});

cucumber.defineRule("the page has a link with data-snap-target {string}", (world, target) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <a href=".${world.requestURL}" id="link"
        data-snap-target="${target}"
      >Link</a>
    </body>`
  );
});

cucumber.defineRule("the page has a link with data-snap-target {string} and data-snap-mode {string}", (world, target, mode) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <a href=".${world.requestURL}" id="link"
        data-snap-target="${target}"
        data-snap-mode="${mode}"
      >Link</a>
    </body>`
  );
});

cucumber.defineRule('the page has a nav with data-snap-target {string} and a link inside', (world, target) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <nav data-snap-target="${target}">
        <a href=".${world.requestURL}" id="link">Link</a>
        <a href="./another-link" id="another-link">Another link</a>
      </nav>
    </body>`
  );
});

cucumber.defineRule("the page has a {string} div", (world, id) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    global.div(id, undefined, id)+'</body>'
  );
});

cucumber.defineRule("the page has a {string} div with content {string}", (world, id, content) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    global.div(id, undefined, content)+'</body>'
  );
});

cucumber.defineRule("the page has a {string} div with class {string}", (world, id, clazz) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    global.div(id, clazz, id)+'</body>'
  );
});

cucumber.defineRule('the server response has a {string} with content {string}', (world, tag, content) => {
  world.responseHTML = world.responseHTML.replace(
    '</body>',
    global.tag(tag, undefined, undefined, content)+'</body>'
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
