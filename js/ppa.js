var map;

function initMap() {
    // Leaflet Map
    map = new L.Map('map');
    
    // Initial location
    var intialPoint = new L.LatLng(27.841845, -82.598578);
    
    // OSM
    var streetMapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var streetMapLayer = new L.TileLayer(streetMapUrl, { maxZoom: 19, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' });

    map.setView(intialPoint, 14);
    map.addLayer(streetMapLayer);
}