var map = L.map('map').setView([40.719190, -73.996589], 11);
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>, Slider by <a href="https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518">John Walley</a>, Play button by <a href="https://css-tricks.com/making-pure-css-playpause-button/">Daniel Abdilla</a>'
});

map.addLayer(CartoDBTiles);

//http://www.d3noob.org/2014/03/leafletjs-map-with-d3js-objects-that.html
//http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/
// Add an SVG element to Leaflet’s overlay pane
  var svg = d3.select(map.getPanes().overlayPane).append("svg");

  var g = svg.append("g").attr("class", "leaflet-zoom-hide");

  var LISA80 = d3.map();  //tsv gets read into this map
  var LISA90 = d3.map();  //tsv gets read into this map
  var LISA00 = d3.map();  //tsv gets read into this map
  var LISA10 = d3.map();  //tsv gets read into this map
  var LISA11 = d3.map();  //tsv gets read into this map
  var LISA12 = d3.map();  //tsv gets read into this map
  var LISA13 = d3.map();  //tsv gets read into this map
  var LISA14 = d3.map();  //tsv gets read into this map
  var LISA15 = d3.map();  //tsv gets read into this map
  var LISA16 = d3.map();  //tsv gets read into this map






queue()
    .defer(d3.json, "data/NYC_tracts_4326.json")
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA80.set(d.BoroCT2010, +d.RE80_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA90.set(d.BoroCT2010, +d.RE90_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA00.set(d.BoroCT2010, +d.RE00_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA10.set(d.BoroCT2010, +d.RE10_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA11.set(d.BoroCT2010, +d.RE11_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA12.set(d.BoroCT2010, +d.RE12_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA13.set(d.BoroCT2010, +d.RE13_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA14.set(d.BoroCT2010, +d.RE14_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA15.set(d.BoroCT2010, +d.RE15_Quad); })
    .defer(d3.csv, "data/allLISA_noparks.csv", function(d) { LISA16.set(d.BoroCT2010, +d.RE16_Quad); })


    .await(ready);

var LISAarray = [LISA80, LISA90, LISA00, LISA10, LISA11, LISA12, LISA13, LISA14, LISA15, LISA16];
var yearArray = [1980, 1990, 2000, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
var arrayLength = LISAarray.length;
  var iter = 0;
  var playing = false;
  d3.select('#clock').html(yearArray[iter]);
  //  create a d3.geo.path to convert GeoJSON to SVG





    var btn = $(".button");
//    btn.click(function() {
//      btn.toggleClass("paused");
//    });

function switch_button () {
btn.toggleClass("paused");
    }


  function ready (error, geoShape) {
    var transform = d3.geo.transform({point: projectPoint}),    //d3 v4 does not have transform
        path = d3.geo.path().projection(transform);

  // create path elements for each of the features
  map.on("viewreset", reset);
  map.on("zoom", reset);

   // initialize the path data
//loopthis();

reset(); //this reprojects map
/*
var slider = document.getElementById("slider");
var output = document.getElementById("clock");
output.innerHTML = slider.value;
slider.oninput = function() {
output.innerHTML = this.value;
iter = this.value-2010;
reset();
};
*/


// needs to be on top
var slider3 = d3.sliderHorizontal()    // https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
  .min(d3.min(yearArray))
  .max(d3.max(yearArray))
//  .step(1)
  .width(200)
  .tickFormat(d3.format(''))
  .marks(yearArray)
  .ticks(5)
//  .tickValues(yearArray)
  .on('onchange', val => {
    d3.select("p#value3").text(d3.format('')(val));  // gets value of slider
    iter = yearArray.indexOf(val); //sets value for reset function
    reset();
  });

var d = d3.select("div#overlay").append("svg")
  .attr("width", 500)
  .attr("height", 100)
  .append("g")
  .attr("transform", "translate(100,30)");

d.call(slider3);


/*

// creates SVG object
var control = L.control();
control.onAdd = function(map){
    this.svg = L.SVG.create("svg","test");
    this.svg.setAttribute("style","height:100px;width:100px;background:white");
//        this.svg +=
         return this.svg;

};
*/



//     d3.select("p#value3").text(d3.timeFormat('%Y')(slider3.value()));
//   d3.select("a#setValue3").on("click", () => slider3.value(new Date(1997, 11, 17)));

// https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/

var startiter = arrayLength+1;
var timer;  // create timer object
  d3.select('#play')
    .on('click', function () {
      if(playing == false) {
      timeout(startiter);   //to start where stopped FIX - first iteration passes code to end -1
//      d3.select(this).html('stop');
      playing = true;
      switch_button();
    } else {    // else if is currently playing
          clearTimeout(timer);   // stop the animation by clearing the interval
    //      d3.select(this).html('play');   // change the button label to play
          playing = false;   // change the status again
          switch_button();
//      clearTimeout(timer);
}
    });


function timeout (i) {
    timer = setTimeout(function () {
      if (i>1) {
        timeout(i);
            iter = arrayLength-i;
            d3.select("#overlay")  //inputs value to slider
              .call(slider3);
              slider3.value(yearArray[iter]);
//            $("#slider").val(iter+2010);
//            $("#slider").trigger('change');
            startiter = i;            // because skips first loop - otherwise i-1
        d3.select('#clock').html(yearArray[iter]);
        console.log(yearArray[iter]);
        reset(iter);
        // Call the loop again, and pass it the current value of i
      } else {    // else if is currently playing
        timeout(i);
            iter = arrayLength-i;
            d3.select("#overlay")
              .call(slider3);
              slider3.value(yearArray[iter]);
  //          $("#overlay").val(iter+2010);     // adjust slider
  //          $("#overlay").trigger('change');
            d3.select('#clock').html(yearArray[iter]);
            reset(iter);
  //          d3.select('#play').html('play');   // change the button label to play
            playing = false;   // change the status again
            switch_button();
            clearTimeout(timer);   // stop the animation by clearing the interval
            startiter = arrayLength+1;

  }
// infinite loop
//      else {
//        i=7;
//        timeout(i);
//        iter = arrayLength-i;
//        d3.select('#clock').html(yearArray[iter]);
//      }

    }, 2000);
  i = i-1;
  }

  // fit the SVG element to leaflet's map layer https://gist.github.com/d3noob/9211665
  function reset() {

   bounds = path.bounds(geoShape);

   var topLeft = bounds[0],
    bottomRight = bounds[1];

   svg .attr("width", bottomRight[0] - topLeft[0])
    .attr("height", bottomRight[1] - topLeft[1])
    .style("left", topLeft[0] + "px")
    .style("top", topLeft[1] + "px");

   g .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
   svg.selectAll("path").remove();  // added this, I think it nulls the svg so it can be drawn again with current properties, the tutorial didn't have data attached

// NEEDS TO REDRAW D3_FEATURES HERE!!!!
  var dataset  = LISAarray[iter];     // needs to be defined within function
    d3_features = g.selectAll("path");

   d3_features
   .data(geoShape.features)
   .enter().append("path")
   .style("fill-opacity", 0.7)
 //  .transition()
 //  .duration(2000)
 //    .attr("fill", function(d) { return fillColor(d.RE10_Quad = LISA10.get(d.BoroCT2010)); }) //.get returns element from map object
   .attr("fill", function(d) { return fillColor(dataset.get(d.properties.BoroCT2010)); }) //.get returns element from map object
   .attr("d", path);

}
}

//for (var i = 0; i < arrayLength; i++) {
//  loop(i);}

    function fillColor(c) {
        return c == 1 ? '#ff0000' :
            //   c == 2 ? '#ff66cc' :
               c == 3 ? '#000099' :
            //   c == 4 ? '#3399ff' :
               c == 0 ? 'none' :
                       '#edf8e9';
    }

  // Use Leaflet to implement a D3 geometric transformation.
  function projectPoint(x, y) {
   var point = map.latLngToLayerPoint(new L.LatLng(y, x));
   this.stream.point(point.x, point.y);
  }

  function getColor(g) {
       switch(g) {
           case 1: return "#ff0000";
           case 2: return "#0000ff";
       }
   };

   var Legend = L.control({position: 'topright'});

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
