'use strict'


function applyColors(elRoot) {
    let clrs = getSetting()
    elRoot.style.setProperty('--clr-bg', clrs['--clr-bg'])
    elRoot.style.setProperty('--clr-primary', clrs['--clr-primary'])
}