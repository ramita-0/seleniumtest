const webdriver = require('selenium-webdriver');

const capabilities1 = {
    'bstack:options' : {
        "resolution": "1920x1080",
        "os": "Windows",
        "osVersion": "11",
        "buildName" : "browserstack-build-1",
        "sessionName" : "Parallel test 1",
    },
    "browserName": "chrome",
    "browserVersion": "103.0",
}

 const capabilities2 = {
    'bstack:options' : {
        "resolution": "1920x1080",
        "os": "Windows",
        "osVersion": "11",
        "buildName" : "browserstack-build-1",
        "sessionName" : "Parallel test 2",
    },
    "browserName": "firefox",
    "browserVersion": "103.0",
}

const capabilities3 = {
    'bstack:options' : {
        "resolution": "1920x1080",
        "os": "OS X",
        "osVersion": "Big Sur",
        "buildName" : "browserstack-build-1",
        "sessionName" : "Parallel test 3",
    },
    "browserName": "safari",
    "browserVersion": "14.1",
}

timeout = time => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, time)
    })
}

async function runTestWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://ramiromoya_S7FTzC:qRYAAQx1eseJcySswMx5@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browserName']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
    
    await driver.get('https://ramita-0.github.io/');
    driver.manage().window().maximize()
    
    // mouse sobre boton js
    timeout(500).then(async woke => {
        const botonJs = driver.findElement({xpath: "/html/body/nav/ul/li[1]/a"})
        driver.actions().move({duration: 0, origin: botonJs}).perform()
        
        // entro a la seccion js
        timeout(650).then(async woke => {
            botonJs.click()

            // scrolleo
            timeout(2000).then(async woke => {
                driver.executeScript('window.scrollBy(0,60);')
                
                // gira el carousel una vez
                timeout(400).then(async woke => {
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
                                                        driver.quit()
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
    })
}

runTestWithCaps(capabilities1);
runTestWithCaps(capabilities2);
runTestWithCaps(capabilities3);