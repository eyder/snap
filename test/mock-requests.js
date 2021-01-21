global.mockRequests = async (page, mocks) => {
  await page.setRequestInterception(true);
  page.on('request', request => {
    for(let mock of mocks) {
      if (
        request.url().endsWith(mock.request.url) ||
        request.url().includes(mock.request.url+"?")
      ) {
        mock.request.data = request.url().includes("?") ? request.url() : request.postData();
        mock.request.method = request.method();
        if (mock.response.shouldTakeTooLong) {
          request.continue();
        } else {
          request.respond({
            status: mock.response.status || 200,
            contentType: 'text/html',
            body: mock.response.html
          });
        }
        return;
      }
    }
  });
}
