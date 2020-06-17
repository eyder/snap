const { cucumber } = require('gherkin-jest');

cucumber.defineRule(/I visit (the|a) page/, async (world) => {
  await global.setupPage(world.pageHTML);
  await global.mockRequests(page, [{
    url: world.requestURL,
    status: 200,
    body: world.responseHTML
  }]);
  //console.log(">>> pageHTML", world.pageHTML);
  //console.log(">>> responseHTML", world.responseHTML);
});

cucumber.defineRule('I click on the link', async () => {
  await page.click('#link');
});
