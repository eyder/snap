const { cucumber } = require('gherkin-jest');
const { HookType } = require('stucumber');
const fs = require('fs');

const snapjs = fs.readFileSync('./dist/snap.min.js', 'utf8');

cucumber.addHook(HookType.BeforeScenarios, (world) => {
  world.request.url = '/link-' + Date.now();
});

cucumber.defineCreateWorld(() => {
  return {
    pageHTML: `
      <head>
        <base href="http://localhost:8080"/>
        <script>${snapjs}</script>
      </head>
      <body>
      </body>`,
    request: {
      url: '/link',
      data: undefined, // filled by mock-request.js
      method: undefined, // filled by mock-request.js
    },
    response: {
      html: `
      <html>
        <body></body>
      </html>`,
      status: 200,
      shouldTakeTooLong: false
    }
  }
});

cucumber.defineRule("the page has a link with data-append-to pointing to the div", (world) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <a href=".${world.request.url}" id="link"
        data-append-to="#the-div"
      >Link</a>
    </body>`
  );
});


cucumber.defineRule("the page has a link with data-append-to {string}", (world, target) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <a href=".${world.request.url}" id="link"
        data-append-to="${target}"
      >Link</a>
    </body>`
  );
});

cucumber.defineRule("the page has a link with data-prepend-to {string}", (world, target) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <a href=".${world.request.url}" id="link"
        data-prepend-to="${target}"
      >Link</a>
    </body>`
  );
});

cucumber.defineRule("the page has a link with data-load-on {string}", (world, target) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <a href=".${world.request.url}" id="link"
        data-load-on="${target}"
      >Link</a>
    </body>`
  );
});

cucumber.defineRule("the link has a span inside", (world) => {
  world.pageHTML = world.pageHTML.replace(
    '</a>',
    ` <span id="span">span inside link</span>
    </a>`
  );
});

cucumber.defineRule('the page has a nav with data-append-to {string} and a link inside', (world, target) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <nav data-append-to="${target}">
        <a href=".${world.request.url}" id="link">Link</a>
        <a href="./another-link" id="another-link">Another link</a>
      </nav>
    </body>`
  );
});

cucumber.defineRule("the page has a form with data-append-to {string} and method {string}", (world, target, method) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    ` <form action=".${world.request.url}" id="form" data-append-to="${target}" method="${method}">
        <input type="submit" id="submit" value="Submit">
      </form>
    </body>`
  );
});

cucumber.defineRule("the form has an {string} text input with value {string}", (world, name, value) => {
  world.pageHTML = world.pageHTML.replace(
    '</form>',
    ` <input type="text" id="${name}" name="${name}" value="${value}">
    </form>`
  );
});

cucumber.defineRule("the page has a {string} div", (world, id) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    global.div(id, undefined, id)+'</body>'
  );
});

cucumber.defineRule("the page has a div with some initial content", (world, id) => {
  world.pageHTML = world.pageHTML.replace(
    '</body>',
    global.div('the-div', undefined, 'initial content')+'</body>'
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

cucumber.defineRule("the div has an error-bucket inside", (world, id, clazz) => {
  world.pageHTML = world.pageHTML.replace(
    '</div>',
    global.div('error-bucket-inside', 'error-bucket', undefined)+`
    </div>`
  );
});

// Response

cucumber.defineRule('the server response will be an error', (world, tag, content) => {
  world.response.html = world.response.html.replace(
    '</body>',
    global.tag('p', undefined, undefined, 'Sorry, something went wrong...')+'</body>'
  );
  world.response.status = 500;
});

cucumber.defineRule('the server response has a {string} with content {string}', (world, tag, content) => {
  world.response.html = world.response.html.replace(
    '</body>',
    global.tag(tag, undefined, undefined, content)+'</body>'
  );
});

cucumber.defineRule('the server response has a comment {string}', (world, comment) => {
  world.response.html = world.response.html.replace(
    '</body>',
    `<!--${comment}--></body>`
  );
});

cucumber.defineRule('the server response has the text {string}', (world, text) => {
  world.response.html = world.response.html.replace(
    '</body>',
    `${text}</body>`
  );
});

cucumber.defineRule('the response takes too long', (world) => {
  world.response.shouldTakeTooLong = true;
});

cucumber.defineRule('the server response is {string}', (world, html) => {
  world.response.html = html;
});

cucumber.defineRule('the server response status is {int}', (world, status) => {
  world.response.status = status;
});
