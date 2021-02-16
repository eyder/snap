module.exports = {
  launch: {
    dumpio: true,
    headless: true,
    devtools: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
    ],
  },
  browserContext: 'default',
}
