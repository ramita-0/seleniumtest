const {Builder, WebDriver, By, Key, until, Actions} = require('selenium-webdriver');

callbackAfterTimeout = (driver, timeInSeconds, callback) => {
    driver.sleep(timeInSeconds * 1000).then(slept => {
        callback()
    })
}

(async function helloSelenium() {
    let driver = await new Builder().forBrowser('firefox').build();

    await driver.get('https://ramita-0.github.io/');
    
    // accediendo a la seccion javascript del portafolio
    await driver.manage().setTimeouts({implicit: 3000})
    await driver.findElement({linkText: "JAVASCRIPT"}).click()

    // accediendo al ejemplo de tabla
    await driver.findElement({className: "carousel-control-prev-icon"}).click()

    callbackAfterTimeout(driver, 1, async () => {
        let el = await driver.findElement({xpath: "/html/body/div[2]/div/div[3]/div/div[2]/div[3]/a"})
        await driver.wait(until.elementIsVisible(el), 500);
        await el.click();
    })
})();