var map;

function initMap() {
    // Leaflet Map
    map = new L.Map('map');
    
    // Initial location
    var intialPoint = new L.LatLng(27.841845, -82.598578);
    
    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "Weedon Island Preserve",
            "amenity": "Cultural Resource",
            "popupContent": "Welcome to Weedon Island Preserve!"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-82.598578, 27.841845]
        }
    };
    
    // OSM
    var streetMapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var streetMapLayer = new L.TileLayer(streetMapUrl, { maxZoom: 19, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' });

    map.setView(intialPoint, 14);
    map.addLayer(streetMapLayer);
    
    var editFeatures = L.geoJson().addTo(map);
    editFeatures.addData(geojsonFeature);

    function addPoint(e) {
        
        var thisPoint = {
            "type": "Feature",
            "properties": {
                "name": "Weedon Island Preserve",
                "amenity": "Cultural Resource",
                "popupContent": "This shard is located at " + e.latlng.toString()
            },
            "geometry": {
                "type": "Point",
                "coordinates": [e.latlng.lng, e.latlng.lat]
            }
        }
        
        editFeatures.addData(thisPoint);
    }
    
    map.on('click', addPoint);
    
    // Either make the ajax and pass the entire editFeatures object
    // or parse it here and submit the latlngs
    // Also need to watch out for jQuery submit() issues outside of a form
    $('#calculateButton').submit(function() {
        editFeatures.eachLayer(function(layer) {
            console.log(layer.getLatLng());
        });
    });
    
}