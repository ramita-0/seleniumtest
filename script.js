const {Builder} = require('selenium-webdriver');

(async function helloSelenium() {
    let driver = await new Builder().forBrowser('firefox').build();

    await driver.get('https://ramita-0.github.io/');

})();