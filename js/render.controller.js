'use strict'


function renderPlaces() {
    const locations = getLocations()
    const elPlacelist = document.querySelector('.placelist-wrapper')
    const strHtml = locations.map((location) => {
        return `
        <div class="location flex" onclick="onToLocation(${location.lat}, ${location.lng})">
            <span class="location-name">${location.placeName}</span>
            <button class="delete-location" onclick="onDelete(event, this)" data-id="${location.id}">X</button>
        </div>
        `
    })
    elPlacelist.innerHTML = strHtml.join('')

}