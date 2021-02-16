global.setupPage = async (pageContent) => {
  page = await browser.newPage();
  await page.setContent(pageContent, {waituntil: 'domcontentloaded'});
}
