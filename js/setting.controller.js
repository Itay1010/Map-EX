'use strict'

$(init())

function init() {
    const elRoot = document.querySelector(':root')
    applySettings(getSetting(), elRoot)
}

function onSubmit(ev) {
    ev.preventDefault()
    const elRoot = document.querySelector(':root')
    saveSetting(ev)
    applySettings(getSetting(), elRoot)
}

function applySettings(newSettings, elRoot) {
    let elFormEls = $('form[name="user-setting"]')[0].elements
    applyColors(elRoot)
    elFormEls['bg-color'].value = newSettings['--clr-bg']
    elFormEls['txt-color'].value = newSettings['--clr-primary']
    elFormEls['b-date'].value = newSettings['b-date']
    elFormEls['b-time'].value = newSettings['b-time']
    elFormEls['age'].value = newSettings['age']
    
    if(newSettings['email']) elFormEls['email'].value = newSettings['email']
}

function renderAge(val) {
    $('.curr-age').text(val)
}