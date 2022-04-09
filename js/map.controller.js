'use strict'

function init() {
    console.log('starting');
    applyColors(document.querySelector(':root'))
    creatLocations()
    applyMarkers()
    renderPlaces()
}

function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 29.5577, lng: 34.9519 },
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: true,
    });
    
    map.addListener('click', (ev) => { clickHandle(ev) });
    
    // Add center button EL to map
    let center = document.querySelector('#center-btn')
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(center)
    window.mainMap = map
    
    init()
}

function onCenterView() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            window.mainMap.setCenter(center)
        },
        () => {
            alert('Failed to get location.\nYour browser might not support HTML5.')
        })
}

function clickHandle(ev) {
    let posName = prompt('Enter location name')
    if (!posName) return
    const marker = new google.maps.Marker({
        position: ev.latLng,
        map: mainMap,
        title: posName,
        label: posName[0].toUpperCase()
    })
    saveLocation(ev, posName, marker)
    renderPlaces()
}

function applyMarkers() {
    const markers = {}
    const savedLocations = getLocations()
    if (!savedLocations) return
    savedLocations.map((loc) => {
        markers[loc.id] = new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map: mainMap,
            title: loc.placeName,
            label: loc.placeName[0].toUpperCase()
        })
    })
    console.log('markers', markers)
    setMarkers(markers)
}

function onToLocation() {
    console.log('moving to location')
}

function onDelete(ev, el) {
    ev.stopPropagation()
    const id = el.dataset.id
    removeMarker(id)
    deletePlace(id)
    renderPlaces()
}

function removeMarker(id) {
    getMarkerById(id).setMap(null)
    deleteMarker(id)
}

function downloadCSV(elLink) {
    const csvContent = getAsCSV()
    elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}