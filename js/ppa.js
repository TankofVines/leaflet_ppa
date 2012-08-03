var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://a.tile.openstreetmap.org', {
    attribution: 'openstreetmap',
    maxZoom: 18
}).addTo(map);