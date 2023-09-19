# leaflet-challenge
Module 15 Challenge for the Tec de Monterrey Data Analysis Bootcamp, Introduction to Leaflet

Javascript file that takes data relating to Earthquake observations done by the United States Geological Survey (USGS) in order to perform analysis and visualizations of it, using the D3 and Leaflet libraries.

logic_part1.js is the main file, it takes GeoJSON data from a URL (http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), in this case, the observations for all earthquakes in the past 7 days, and it creates functions in order to display that data in a map. These functions create Base and Overlay layers for maps, allowing to toggle between Street Map and Topographical Map, as well as seeing the data for earthquakes with circle markers, with the radius of the circle indicating its degree in the Richter Scale, and its color indicating the depth of it.
The file also defines a legend that explains the values for the colors of the markers.

index.html is the file where the HTML for the visualization exists, and it connects with D3 JS, Leaflet CSS, Leaflet JS, Our CSS and our JS.

style.css is the file where the CSS exists, it gives format to the map as well as the legend that explains the depths and color relations.

The main directory of this project contains the Images Directory, for pictures provided in the Starter Code, as well as the Leaflet-Part-1 Directory, which contains the code. This Leaflet-Part-1 directory has the index.html file, as well as the static directory, which contains further directories for css, containing style.css and js, containing logic_part1.

Contributions:
- Data Analysis Bootcamp Classes
- https://www.dashingd3js.com/d3-tutorial/d3-json-data
- https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
- https://www.w3schools.com/TAGs/
- https://codepen.io/haakseth/pen/KQbjdO
- https://leafletjs.com/reference.html
