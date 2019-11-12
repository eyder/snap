global.mockRequests = async (page, mocks) => {
  await page.setRequestInterception(true);
  page.on('request', request => {
    for(let mock of mocks) {
      if (request.url().endsWith(mock.url)) {
        request.respond({
          status: 200,
          contentType: 'text/html',
          body: mock.body
        });
        return;
      }
    }
    request.continue();
  });
}
