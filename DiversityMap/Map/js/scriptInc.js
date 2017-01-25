

var map = L.map('map').setView([40.719190, -73.996589], 11);

var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});



map.addLayer(CartoDBTiles);



$.getJSON( "data/AllDiversity_Web.geojson", function( data ) {
    var dataset = data;

    plotDataset(dataset);

});

function plotDataset(dataset) {
     IEnt00Sq = L.geoJson(dataset, {
        style: incStyle00,
        onEachFeature: incOnEachFeature00
    }).addTo(map);

    IEnt09Sq = L.geoJson(dataset, {
        style: incStyle09,
        onEachFeature: incOnEachFeature09
    }).addTo(map);

    IEnt14Sq = L.geoJson(dataset, {
        style: incStyle14,
        onEachFeature: incOnEachFeature14
    }).addTo(map);




createLayerControls();
}



var incStyle00 = function (feature, latlng) {

    var style = {
        weight: 1,
        opacity: .25,
        color: 'grey',
        fillOpacity: fillOpacity(feature.properties.IEnt00Sq),
        fillColor: fillColorPercentage(feature.properties.IEnt00Sq)
    };

    return style;

}

var incStyle09 = function (feature, latlng) {

    var style = {
        weight: 1,
        opacity: .25,
        color: 'grey',
        fillOpacity: fillOpacity(feature.properties.IEnt09Sq),
        fillColor: fillColorPercentage(feature.properties.IEnt09Sq)
    };

    return style;

}

var incStyle14 = function (feature, latlng) {

    var style = {
        weight: 1,
        opacity: .25,
        color: 'grey',
        fillOpacity: fillOpacity(feature.properties.IEnt14Sq),
        fillColor: fillColorPercentage(feature.properties.IEnt14Sq)
    };

    return style;

}






function fillColorPercentage(d) {
    return  d == 'High' ? '#0000ff' :
            d == 'Low' ? '#ff0000' :
            d > 0.90 ? '#006d2c' :
           d > 0.80 ? '#31a354' :
           d > 0.70 ? '#74c476' :
           d > 0.50 ? '#a1d99b' :
           d > 0.25 ? '#c7e9c0' :
                   '#edf8e9';
}

function fillOpacity(d) {
    return d == 0 ? '#808080' :
                    0.75;
}

var popup = new L.Popup();

 var incOnEachFeature00 = function(feature,layer){

  layer.on("click", function (e) {
       var bounds = layer.getBounds();
        var popupContent = "<strong>Diversity:</strong> " + feature.properties.IEnt00Sq +  "<br /><strong>Asian:</strong> " + (feature.properties.Asian00*100).toFixed(1) +" %" + "<br /><strong>Black:</strong> " + (feature.properties.Black00 *100).toFixed(1) +" %"+ "<br /><strong>Hispanic:</strong> "+ (feature.properties.Hispanic00*100).toFixed(1) +" %" + "<br /><strong>White:</strong> " + (feature.properties.White00*100).toFixed(1) +" %"+ "<br /><strong>Other:</strong> " + (feature.properties.Other00*100).toFixed(1) +" %";
        popup.setLatLng(bounds.getCenter());
        popup.setContent(popupContent);
        map.openPopup(popup);
    });


}

var incOnEachFeature09 = function(feature,layer){

 layer.on("click", function (e) {
      var bounds = layer.getBounds();
       var popupContent = "<strong>Diversity:</strong> " + feature.properties.IEnt09Sq +  "<br /><strong>Asian:</strong> " + (feature.properties.Asian09 *100).toFixed(1) +" %" + "<br /><strong>Black:</strong> " + (feature.properties.Black09 *100).toFixed(1) +" %"+ "<br /><strong>Hispanic:</strong> "+ (feature.properties.Hispanic09*100).toFixed(1) +" %" + "<br /><strong>White:</strong> " + (feature.properties.White09*100).toFixed(1) +" %"+ "<br /><strong>Other:</strong> " + (feature.properties.Other09*100).toFixed(1) +" %";
       popup.setLatLng(bounds.getCenter());
       popup.setContent(popupContent);
       map.openPopup(popup);
   });


}

var incOnEachFeature14 = function(feature,layer){

 layer.on("click", function (e) {
      var bounds = layer.getBounds();
       var popupContent = "<strong>Diversity:</strong> " + feature.properties.IEnt14Sq +  "<br /><strong>Asian:</strong> " + (feature.properties.Asian14 *100).toFixed(1) +" %" + "<br /><strong>Black:</strong> " + (feature.properties.Black14 *100).toFixed(1) +" %"+ "<br /><strong>Hispanic:</strong> "+ (feature.properties.Hispanic14*100).toFixed(1) +" %" + "<br /><strong>White:</strong> " + (feature.properties.White14*100).toFixed(1) +" %"+ "<br /><strong>Other:</strong> " + (feature.properties.Other14*100).toFixed(1) +" %";
       popup.setLatLng(bounds.getCenter());
       popup.setContent(popupContent);
       map.openPopup(popup);
   });


}


function createLayerControls(){

 var baseMaps = {
   "2000": IEnt00Sq,
   "2009": IEnt09Sq,
   "2014": IEnt14Sq,


    };

    var overlayMaps = {
         "LISA 2000": LISAInc00,
         "LISA 2009": LISAInc09,
         "LISA 2014": LISAInc14,



    };

    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

}



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 0.25, 0.50, 0.70, 0.80, 0.90]

        div.innerHTML += '<p>Diversity Index</p>';

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + fillColorPercentage(grades[i] + 0.01) + '"></i> ' +
                grades[i] + (grades[i + 0.01] ? + grades[i + 0.01] + '<br />' : '<br />');
        }

  return div;
};

legend.addTo(map);

function getColor(g) {
     switch(g) {
         case 1: return "#ff0000";
         case 2: return "#0000ff";
     }
 };

 var Legend = L.control({position: 'bottomright'});

 Legend.onAdd = function (map) {
     var legdiv = L.DomUtil.create('div', 'legend'),
         categories = [1, 2],
         labels = ['High-High', 'Low-Low',];

  legdiv.innerHTML += '<p>LISA Clusters</p>';

     for (var i = 0; i < categories.length; i++) {
         legdiv.innerHTML +=
             '<i style="background:' + getColor(categories[i]) + '"></i> ' + (categories[i] ? labels[i] + '<br>' : '+');
     }
     return legdiv;
 };
 Legend.addTo(map);

 map.createPane('imagePane');
 map.getPane('imagePane').style.zIndex = 401;
 var LISAInc14 = L.imageOverlay("data/LISAInc14.png", [[40.4768, -74.341], [40.9255, -73.706]],{
  pane: 'imagePane'
});
 var LISAInc09 = L.imageOverlay("data/LISAInc09.png", [[40.4768, -74.341], [40.9255, -73.706]],{
  pane: 'imagePane'
});
 var LISAInc00 = L.imageOverlay("data/LISAInc00.png", [[40.4768, -74.341], [40.9255, -73.706]],{
  pane: 'imagePane'
});



LISAInc00.setOpacity(0.7);
LISAInc14.setOpacity(0.7);
LISAInc09.setOpacity(0.7);
