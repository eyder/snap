global.setupPage = async (pageContent) => {
  //jest.setTimeout(1000000); uncomment when debugging
  await page.setContent(pageContent, {waituntil: 'domcontentloaded'});
  await page.addScriptTag({path: require.resolve('../dist/snap.min.js')});
}
