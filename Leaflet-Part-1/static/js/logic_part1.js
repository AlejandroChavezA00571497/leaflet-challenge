//Using the USGS GeoJSON for the significant earthquakes in the past 30 days
let geoJsonURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"


//Creation of our map object
let myMap = L.map("map", {
    center : [35, -100],
    zoom : 3
});


//Creation of a Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


//Getting features
d3.json(geoJsonURL).then(function(data){
    let listFeatures = data.features;
    // Console Logging features just to check them out
    console.log(listFeatures)

});