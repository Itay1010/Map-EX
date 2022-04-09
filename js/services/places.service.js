'use strict'

let gLocations =[]

function saveLocation(ev, posName) {
    let newLocation = _creatLocation(ev.latLng.lat(), ev.latLng.lng(), posName)
    gLocations.push(newLocation)
    saveToStorage('placesDB', gLocations)
}

function getLocations() {
    return gLocations
}

function creatLocations() {
    const locations = loadFromStorage('placesDB')
    if (!locations || locations === []) return
    gLocations = locations
}

function _creatLocation(lat, lng, placeName) {
    return {
        id: _makeId(),
        lat,
        lng,
        placeName
    }
}
