
const testPage = `
<head>
  <base href="http://localhost:8080" />
</head>
<body>
  <a id="link-without-target" href="./content-without-target" data-snap>link-without-target</a>
  <a id="link-with-two-targets" href="./content-with-two-targets" data-snap>link-with-two-targets</a>
  <div id="target-1"></div>
  <div id="target-2"></div>
</body>
`;

var mocks = [
  {
    url: '/content-without-target',
    body: '<div id="content-without-target">content-without-target</div>'
  },
  {
    url: '/content-with-two-targets',
    body: `
      <div id="content-for-target-1" data-snap-target="#target-1">content-for-target-1</div>
      <div id="content-for-target-2" data-snap-target="#target-2">content-for-target-2</div>`
  },
]

describe('SNAP', () => {
  beforeAll(async () => {
    global.setupPage(testPage);
    global.mockRequests(page, mocks);
  });
  afterEach(() => {
  })
  it('replaces link tag with response body when there is no data-snap-target on the response', async () => {
    await page.click('#link-without-target');
    (await global.expect$('#link-without-target')).toBeNull();
    (await global.expect$('#content-without-target')).not.toBeNull();
    (await global.expect$Content('#target-1')).toBe("");
    (await global.expect$Content('#target-2')).toBe("");
  });
  it('replaces targets with response body when there are data-snap-target attributes on the response', async () => {
    await page.click('#link-with-two-targets');
    (await global.expect$('#link-with-two-targets')).not.toBeNull();
    (await global.expect$('#content-for-target-1')).not.toBeNull();
    (await global.expect$('#content-for-target-2')).not.toBeNull();
    (await global.expect$Content('#target-1')).toBe("");
    (await global.expect$Content('#target-2')).toBe("");
  });
});
