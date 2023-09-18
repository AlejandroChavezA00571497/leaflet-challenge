//Using the USGS GeoJSON for all earthquakes in the past day
let geoJsonURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

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

    // Create an overlayMaps object to hold the earthquakeLocations layer.
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


  //Function for changing the color of markers according to depth
  function earthquakeColor(depth) {
    if (depth < 10 & depth > -10) return "#29ff74";
    else if (depth >= 10 & depth < 30) return "#94ff29";
    else if (depth >= 30 & depth < 50) return "#d1ff29";
    else if (depth >= 50 & depth < 70) return "#ffd129";
    else if (depth >= 70 & depth < 90) return "#ff7b29";
    else if (depth >= 90) return "#ff2929";
    else return "white";
  }



  function createMarkers(response) {
    let features = response.features;
    let locations = [];
    // Loop through the features array.
    for (let index = 0; index < features.length; index++) {
      let location = features[index];

      let earthquakeMarker = L.circleMarker([location.geometry.coordinates[1],location.geometry.coordinates[0]], {
        radius : location.properties.mag*4,
        fillColor : earthquakeColor(location.geometry.coordinates[2]),
        color : "#000",
        weight : 1,
        opacity : .75,
        fillOpacity : 0.5
      })
        .bindPopup("<h3>" + location.properties.place + "<h3><h3>Magnitude: " + location.properties.mag + "</h3>");
      locations.push(earthquakeMarker);
    }
    // Create a layer group that's made from the locations array, and pass it to the createMap function.
    createMap(L.layerGroup(locations));
  };



// Perform an API call to the Earthquakes data to get the required information. Call createMarkers when it completes.
d3.json(geoJsonURL).then(createMarkers);
  

//Adding a legend showing the depth of earthquakes
let legend = L.control({position : "bottomright"});

legend.onAdd = function(){
  let div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Earthquake Depth (Kms)</h4>";
  div.innerHTML += '<i style="background: #29ff74"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #d1ff29"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #ffd129"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #ff7b29"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #ff2929"></i><span>-10-10</span><br>';

return div;

};

legend.addTo(myMap)
