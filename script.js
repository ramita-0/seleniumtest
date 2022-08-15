const {Builder, WebDriver, By, Key, until, Actions} = require('selenium-webdriver');


callbackAfterTimeout = (driver, timeInSeconds, callback) => {
    driver.sleep(timeInSeconds * 1000).then(slept => {
        callback()
    })
}

timeout = time => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, time)
    })
}

(async function main() {
    let driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://ramita-0.github.io/');

    // mouse sobre boton js
    timeout(500).then(async woke => {
        const botonJs = driver.findElement({xpath: "/html/body/nav/ul/li[1]/a"})
        driver.actions().move({duration: 0, origin: botonJs}).perform()
        
        // entro a la seccion js
        timeout(650).then(async woke => {
            botonJs.click()

            // giro el carousel 1 vez
            timeout(2000).then(async woke => {
                await driver.findElement({className: "carousel-control-prev-icon"}).click()
                
                // mouse sobre una card
                timeout(700).then(async woke => {
                    const card0 = driver.findElement({xpath: "/html/body/div[2]/div/div[3]/div/div[1]/div[2]"})
                    driver.actions().move({duration: 300, origin: card0}).perform()        
                    
                    // mouse sobre la otra card
                    timeout(1500).then(async woke => {
                        const card1 = driver.findElement({xpath: "/html/body/div[2]/div/div[3]/div/div[2]/div[2]"})
                        driver.actions().move({duration: 300, origin: card1}).perform()
                        
                        // mouse sobre el boton de probar de la card actual
                        timeout(1000).then(async woke => {
                            const botonCard1 = driver.findElement({xpath: "/html/body/div[2]/div/div[3]/div/div[2]/div[3]/a"})
                            driver.actions().move({duration: 0, origin: botonCard1}).perform()
                            
                            // entrar a la seccion de cargado de datos
                            timeout(500).then(async woke => {
                                botonCard1.click()
                                
                                // click al boton de nuevos datos
                                timeout(1000).then(async => {
                                    const nuevosDatos = driver.findElement({xpath: '//*[@id="nuevosDatos"]'})
                                    nuevosDatos.click()
                                    
                                    // escritura de nombre
                                    timeout(200).then(async woke => {
                                        const nombreField = driver.findElement({xpath: '//*[@id="input1"]'})
                                        nombreField.sendKeys("Ramiro")
                                        
                                        // escritura de nombre
                                        timeout(1000).then(async woke => {
                                            const apellidoField = driver.findElement({xpath: '//*[@id="input2"]'})
                                            apellidoField.sendKeys("Moya")
                                            
                                            // escritura de nombre
                                            timeout(1000).then(async woke => {
                                                const edadField = driver.findElement({xpath: '//*[@id="input3"]'})
                                                edadField.sendKeys(19)
                                                driver.findElement({xpath: '//*[@id="insertarDatos"]'}).click()
                                                
                                                // navegar a la landing
                                                timeout(1500).then(async woke => {
                                                    driver.navigate().back()
                                                    driver.navigate().back()
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    
    


    // callbackAfterTimeout(driver, 1, async() => {
    //     // let el = await driver.findElement({xpath: "/html/body/div[2]/div/div[3]/div/div[2]/div[3]/a"})
    //     // await driver.wait(until.elementIsVisible(el), 500);
    //     // await el.click();
        
    // })
})();