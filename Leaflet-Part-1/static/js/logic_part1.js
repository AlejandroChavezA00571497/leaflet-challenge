//Using the USGS GeoJSON for the significant earthquakes in the past 30 days
let geoJsonURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

/*
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

*/

function createMap(earthquakeLocations) {
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
      "Earthquake Locations": earthquakeLocations
    };
    // Create the map object with options.
    let myMap = L.map("map", {
      center: [35, -100],
      zoom: 3,
      layers: [streetmap, earthquakeLocations]
    });
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }

  function createMarkers(response) {
    // Pull the "stations" property from response.data.
    let features = response.features;
    // Initialize an array to hold bike markers.
    let locations = [];
    // Loop through the stations array.
    for (let index = 0; index < features.length; index++) {
      let location = features[index];
      // For each station, create a marker, and bind a popup with the station's name.
      let earthquakeMarker = L.marker([location.geometry.coordinates[1],location.geometry.coordinates[0]])
        .bindPopup("<h3>" + location.properties.place + "<h3><h3>Magnitude: " + location.properties.mag + "</h3>");
      // Add the marker to the bikeMarkers array.
      locations.push(earthquakeMarker);
    }
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(locations));
  }


  // Perform an API call to the Earthquakes data to get the required information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").then(createMarkers);
  