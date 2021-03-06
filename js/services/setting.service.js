'use strict'


function saveSetting(ev) {
    const setting = {}
    console.log('ev', ev.target)

    setting['--clr-bg'] = ev.target['bg-color'].value
    setting['--clr-primary'] = ev.target['txt-color'].value
    setting['b-date'] = ev.target['b-date'].value
    setting['b-time'] = ev.target['b-time'].value
    setting['email'] = ev.target['email'].value
    setting['age'] = ev.target['age'].value

    saveToStorage('userSettings', setting) 
}

function formatSetting() {
    const setting = getSetting()
    const newSetting = Object.keys(setting).map((key) => [String(key), setting[String(key)]]);
    return newSetting.flat()
}

function getSetting() {
    return loadFromStorage('userSettings')
}