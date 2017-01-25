

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

    EntComp00 = L.geoJson(dataset, {
        style: compStyle00,
        onEachFeature: compOnEachFeature00
    }).addTo(map);


     EntComp09 = L.geoJson(dataset, {
        style: compStyle09,
        onEachFeature: compOnEachFeature09
    }).addTo(map);

    EntComp14 = L.geoJson(dataset, {
        style: compStyle14,
        onEachFeature: compOnEachFeature14
    }).addTo(map);





createLayerControls();
}
var compStyle00 = function (feature, latlng) {

    var style = {
        weight: 1,
        opacity: .25,
        color: 'grey',
        fillOpacity: fillOpacity(feature.properties.EntComp00),
        fillColor: fillColorPercentage(feature.properties.EntComp00)
    };

    return style;

}


var compStyle09 = function (feature, latlng) {

    var style = {
        weight: 1,
        opacity: .25,
        color: 'grey',
        fillOpacity: fillOpacity(feature.properties.EntComp09),
        fillColor: fillColorPercentage(feature.properties.EntComp09)
    };

    return style;

}

var compStyle14 = function (feature, latlng) {

    var style = {
        weight: 1,
        opacity: .25,
        color: 'grey',
        fillOpacity: fillOpacity(feature.properties.EntComp14),
        fillColor: fillColorPercentage(feature.properties.EntComp14)
    };

    return style;

}




function fillColorPercentage(d) {
    return d > 0.70 ? '#006d2c' :
           d > 0.60 ? '#31a354' :
           d > 0.50 ? '#74c476' :
           d > 0.40 ? '#a1d99b' :
           d > 0.25 ? '#c7e9c0' :
                   '#edf8e9';
}

function fillOpacity(d) {
    return d == 0 ? '#808080' :
                    0.75;
}

var popup = new L.Popup();

var compOnEachFeature00 = function(feature,layer){

 layer.on("click", function (e) {
      var bounds = layer.getBounds();
       var popupContent = "<strong>Diversity:</strong> " + feature.properties.EntComp00 +  "<br /><strong>Asian:</strong> " + (feature.properties.Asian00 *100).toFixed(1) +" %" + "<br /><strong>Black:</strong> " + (feature.properties.Black00 *100).toFixed(1) +" %"+ "<br /><strong>Hispanic:</strong> "+ (feature.properties.Hispanic00*100).toFixed(1) +" %" + "<br /><strong>White:</strong> " + (feature.properties.White00*100).toFixed(1) +" %"+ "<br /><strong>Other:</strong> " + (feature.properties.Other00*100).toFixed(1) +" %";
       popup.setLatLng(bounds.getCenter());
       popup.setContent(popupContent);
       map.openPopup(popup);
   });


}


 var compOnEachFeature09 = function(feature,layer){

  layer.on("click", function (e) {
       var bounds = layer.getBounds();
        var popupContent = "<strong>Diversity:</strong> " + feature.properties.EntComp09 +  "<br /><strong>Asian:</strong> " + (feature.properties.Asian09 *100).toFixed(1) +" %" + "<br /><strong>Black:</strong> " + (feature.properties.Black09 *100).toFixed(1) +" %"+ "<br /><strong>Hispanic:</strong> "+ (feature.properties.Hispanic09*100).toFixed(1) +" %" + "<br /><strong>White:</strong> " + (feature.properties.White09*100).toFixed(1) +" %"+ "<br /><strong>Other:</strong> " + (feature.properties.Other09*100).toFixed(1) +" %";
        popup.setLatLng(bounds.getCenter());
        popup.setContent(popupContent);
        map.openPopup(popup);
    });


}

var compOnEachFeature14 = function(feature,layer){

 layer.on("click", function (e) {
      var bounds = layer.getBounds();
       var popupContent = "<strong>Diversity:</strong> " + feature.properties.EntComp14 +  "<br /><strong>Asian:</strong> " + (feature.properties.Asian14 *100).toFixed(1) +" %" + "<br /><strong>Black:</strong> " + (feature.properties.Black14 *100).toFixed(1) +" %"+ "<br /><strong>Hispanic:</strong> "+ (feature.properties.Hispanic14*100).toFixed(1) +" %" + "<br /><strong>White:</strong> " + (feature.properties.White14*100).toFixed(1) +" %"+ "<br /><strong>Other:</strong> " + (feature.properties.Other14*100).toFixed(1) +" %";
       popup.setLatLng(bounds.getCenter());
       popup.setContent(popupContent);
       map.openPopup(popup);
   });


}



function createLayerControls(){

 var baseMaps = {
	"2000": EntComp00,
   "2009": EntComp09,
   "2014": EntComp14,


    };

    var overlayMaps = {
         "LISA 2000": LISAComp00,
         "LISA 2009": LISAComp09,
         "LISA 2014": LISAComp14,



    };

    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

  }



  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 0.25, 0.40, 0.50, 0.60, 0.70]

        div.innerHTML += '<p>Diversity Index<br>(squared)</p>';

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
  var LISAComp14 = L.imageOverlay("data/LISAComp14.png", [[40.4768, -74.341], [40.9255, -73.706]],{
  pane: 'imagePane'
  });
  var LISAComp09 = L.imageOverlay("data/LISAComp09.png", [[40.4768, -74.341], [40.9255, -73.706]],{
  pane: 'imagePane'
  });
  var LISAComp00 = L.imageOverlay("data/LISAComp00.png", [[40.4768, -74.341], [40.9255, -73.706]],{
  pane: 'imagePane'
  });



  LISAComp00.setOpacity(0.7);
  LISAComp14.setOpacity(0.7);
  LISAComp09.setOpacity(0.7);
