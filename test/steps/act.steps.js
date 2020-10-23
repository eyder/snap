const { cucumber } = require('gherkin-jest');

cucumber.defineRule("I visit the page", async (world) => {
  await global.setupPage(world.pageHTML);
  await global.mockRequests(page, [{
    request: world.request,
    response: world.response
  }]);
  //console.log(">>> pageHTML", world.pageHTML);
  //console.log(">>> response.html", world.response.html);
});

cucumber.defineRule('I click on the link', async () => {
  await page.click('#link');
});

cucumber.defineRule('I click on the span', async () => {
  await page.click('#span');
});

cucumber.defineRule('I submit the form', async () => {
  await page.click('#submit');
});
