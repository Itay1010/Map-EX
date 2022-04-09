'use strict'

let gLocations = [];
let gMarkers;

//creat new location
function creatLocations() {
    const locations = loadFromStorage('placesDB')
    if (!locations || locations === []) return
    gLocations = locations
}

function saveLocation(ev, posName, marker) {
    let newLocation = _creatLocation(ev.latLng.lat(), ev.latLng.lng(), posName)
    gLocations.push(newLocation)
    _saveLocations()
    gMarkers[newLocation.id] = marker
}

//location getters
function getLocations() {
    return gLocations
}

function getLocationById(id) {
    return gLocations.find(loc => loc.id === String(id))
}

function getLocationIdx(id) {
    return gLocations.findIndex(loc => loc.id === String(id))
}

//delete location
function deletePlace(id) {
    const locationIdx = getLocationIdx(id)
    gLocations.splice(locationIdx, 1)
    _saveLocations()
}

//marker handling
function getMarkerById(id) {
    return gMarkers[id]
}


function setMarkers(mrks) {
    gMarkers = mrks
}

function deleteMarker(id) {
    delete gMarkers[id]
}

//privet location functions
function _creatLocation(lat, lng, placeName) {
    return {
        id: _makeId(),
        lat,
        lng,
        placeName
    }
}

function _saveLocations() {
    saveToStorage('placesDB', gLocations)
}

function getAsCSV() {
    let csvStr = Object.keys(_creatLocation()).map(capitlaize).join()
    gLocations.forEach((location) => {
        const csvLine = Object.values(location).join()
        csvStr += ('\n' + csvLine)
    })
    return csvStr
}

function capitlaize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}