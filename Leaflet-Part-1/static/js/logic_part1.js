//Using the USGS GeoJSON for all earthquakes in the past week
let geoJsonURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


function createMap(earthquakeLocations) {
    // Creating the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    //Creating a topographical layer
    let topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Creating a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap,
      "Topographical Map" : topomap
    };

    // Creating an overlayMaps object to hold the earthquakeLocations layer.
    let overlayMaps = {
      "Earthquake Locations": earthquakeLocations
    };

    // Creating the map object with options.
    var myMap = L.map("map", {
      center: [35, -100],
      zoom: 3,
      layers: [topomap, streetmap, earthquakeLocations]
    });

    var legend = L.control({ position: "bottomright" });

    // Creating a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    //Adding a legend showing the depth of earthquakes
    //Code taken from: https://codepen.io/haakseth/pen/KQbjdO
    var legend = L.control({position : "bottomright"});
    legend.onAdd = function(){
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Depth (Kms)</h4>";
    div.innerHTML += '<i style="background: #29ff74"></i><span>-10-10</span><br>';
    div.innerHTML += '<i style="background: #94ff29"></i><span>10-30</span><br>';
    div.innerHTML += '<i style="background: #d1ff29"></i><span>30-50</span><br>';
    div.innerHTML += '<i style="background: #ffd129"></i><span>50-70</span><br>';
    div.innerHTML += '<i style="background: #ff7b29"></i><span>70-90</span><br>';
    div.innerHTML += '<i style="background: #ff2929"></i><span>90+</span><br>';
    return div;
    };
    legend.addTo(myMap)

  };


  //Function for changing the color of markers according to depth
  function earthquakeColor(depth) {
    if (depth < 10 & depth > -10) return "#29ff74";
    else if (depth >= 10 & depth < 30) return "#94ff29";
    else if (depth >= 30 & depth < 50) return "#d1ff29";
    else if (depth >= 50 & depth < 70) return "#ffd129";
    else if (depth >= 70 & depth < 90) return "#ff7b29";
    else if (depth >= 90) return "#ff2929";
    else return "white";
  };


  function createMarkers(response) {
    let features = response.features;
    let locations = [];
    // Looping through the features array.
    for (let index = 0; index < features.length; index++) {
      let location = features[index];

      let earthquakeMarker = L.circleMarker([location.geometry.coordinates[1],location.geometry.coordinates[0]], {
        radius : location.properties.mag*3,
        fillColor : earthquakeColor(location.geometry.coordinates[2]),
        color : "#000",
        weight : 1,
        opacity : .75,
        fillOpacity : 0.5
      })
        .bindPopup("<h3>" + location.properties.place + "</h3><h3>Magnitude: " + location.properties.mag + " Ricther Degrees </h3><h3>Depth: " + location.geometry.coordinates[2] + " km </h3>");
      locations.push(earthquakeMarker);
    }
    // Creating a layer group that's made from the locations array, and pass it to the createMap function.
    createMap(L.layerGroup(locations));
  };


// Performing an API call to the Earthquakes data to get the required information. Call createMarkers when it completes.
d3.json(geoJsonURL).then(createMarkers);