var map;
var coords = [];
var proj = L.Projection.Mercator;

function initMap() {
    // Leaflet Map
    map = new L.Map('map', {
        doubleClickZoom: false
    });
    
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
    
    $('#calculateButton').click(function() {
        editFeatures.eachLayer(function(layer) {
            console.log(proj.project(layer.getLatLng()));
            coord = proj.project(layer.getLatLng());
            northing = coord.x;
            easting = coord.y;
            coords.push([northing,easting]);
        });
        
        $.ajax({
            url: 'http://23.21.65.194:3000/nndist',
            cache: false,
            data: {
                coordinates: JSON.stringify(coords)
                },
            dataType: "jsonp",
            success: function(responseData) {
                // Do something with the response......................
                console.log(responseData);
                alert(responseData);
            }
        });
        
    });
    
}