const {Builder, WebDriver, By, Key, until, Actions, Window} = require('selenium-webdriver');

timeout = time => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(true)
        }, time)
    })
}

(async function main() {
    // instanciando el driver y entrando a mi web
    let driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://ramita-0.github.io/');
    await driver.manage().window().maximize()
    
    // hover y clickeado del boton js
    let botonJs = await driver.findElement({xpath: "/html/body/nav/ul/li[1]/a"})
    await driver.wait(until.elementIsVisible(botonJs))
    await driver.actions().move({duration: 200, origin: botonJs}).perform()
    await driver.wait(timeout(1000))
    botonJs.click()

    // giro el carousel
    await driver.wait(timeout(200))
    const botonCarousel = await driver.findElement({xpath: '/html/body/div[2]/button[1]'})
    // await driver.executeScript('window.scrollBy(0,60)')
    await driver.executeScript("arguments[0].scrollIntoView(true);", botonCarousel)
    await driver.wait(timeout(1000))
    botonCarousel.click()
    await driver.wait(timeout(1000))
    botonCarousel.click()
    await driver.wait(timeout(1000))
    botonCarousel.click()
    await driver.wait(timeout(1000))
    botonCarousel.click()
    
    // hover sobre cards
    await driver.wait(timeout(800))
    const card0 = driver.findElement({xpath: "/html/body/div[2]/div/div[3]/div/div[1]/div[2]"})
    await driver.executeScript("window.scrollBy(0,40)")
    await driver.wait(timeout(300))
    await driver.actions().move({origin: card0}).perform()        
    const card1 = driver.findElement({xpath: "/html/body/div[2]/div/div[3]/div/div[2]/div[2]"})
    await driver.actions().move({duration: 1500, origin: card1}).perform()
    
    // hover y clickeado del boton de la ultima card
    const botonCard1 = driver.findElement({xpath: "/html/body/div[2]/div/div[3]/div/div[2]/div[3]/a"})
    await driver.actions().move({duration: 500, origin: botonCard1}).perform()
    await driver.wait(timeout(800))
    botonCard1.click()
    
    // insercion de datos
    await driver.wait(timeout(1000))
    const nuevosDatos = driver.findElement({xpath: '//*[@id="nuevosDatos"]'})
    nuevosDatos.click()

    const nombreField = driver.findElement({xpath: '//*[@id="input1"]'})
    await driver.wait(timeout(1000))
    nombreField.sendKeys("Ramiro")
    const apellidoField = driver.findElement({xpath: '//*[@id="input2"]'})
    await driver.wait(timeout(1000))
    apellidoField.sendKeys("Moya")
    const edadField = driver.findElement({xpath: '//*[@id="input3"]'})
    await driver.wait(timeout(1000))
    edadField.sendKeys(19)
    await driver.wait(timeout(400))
    driver.findElement({xpath: '//*[@id="insertarDatos"]'}).click()

    // volver a la landing y salir
    await driver.wait(timeout(1500))
    await driver.navigate().back()
    await driver.wait(timeout(500))
    await driver.navigate().back()
    await driver.wait(timeout(1000))
    await driver.quit()
})()