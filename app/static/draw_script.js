"use strict";
//var myPlot = document.getElementById('plot_div');
//
//
//myPlot.on('plotly_click', function(data){
//  // data.points contains information about the clicked point
//  var clickedPoint = data.points[0];
//  var x = clickedPoint.x;
//  var y = clickedPoint.y;
//  var color_of_point = Object.values(clickedPoint.data.marker.color);
//
//  // Sending coordinates to the server using AJAX
//  console.error('Error while updating color:', 'hello0');
//  console.log(Object.keys(clickedPoint.data.marker.symbol));
//  console.log(Object.keys(clickedPoint.data.marker.color));
//  console.log(color_of_point);
//


//  var index = clickedPoint.pointNumber;
//  Plotly.update('plot_div', {marker: {color: color_of_point}},[index]);
//  alert(color_of_point);
//  $.ajax({
//    type: 'POST',
//    url: '/click_handler',
//    data: { x: x, y: y },
//    success: function(response) {
//      // Assuming the response contains information about the color
//      var color = response.color;
//      console.error('Error while updating color:', 'hello1');
//
//      // Updating the color of the clicked point
//      var index = clickedPoint.pointNumber;
//      Plotly.update('yourDivId', {marker: {color: color}}, [index]);
//    },
//    error: function(error) {
//      // Handling the error
//      console.error('Error while updating color:', 'hello2');
//    }
//  });







var trace1 = {
  y: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  mode: 'markers',
  marker: {
    size: 40,
    color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    selectedcolor: 'green'
  }
};

var trace2 = {
  y: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  mode: 'markers',
  marker: {
    size: 30,
    color: ['#C54C82', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    selectedcolor: 'green'
  }
};

var data = [trace1,trace2];
// console.log(data);
var layout = {
  title: 'Scatter Plot with a Color Dimension'
};


Plotly.newPlot('plot_div', data, layout);
var myPlot = document.getElementById('plot_div');


myPlot.on('plotly_click', function(data){
  // data.points contains information about the clicked point
  var clickedPoint = data.points[0];
  var x = clickedPoint.x;
  var y = clickedPoint.y;
  var color_of_point = Object.values(clickedPoint.data.marker.color);
  console.log(Object.values(clickedPoint));
});



var color1Light = '#c2a5cf';
var N = 1000;
myPlot.on('plotly_selected', function(eventData) {
  var x = [];
  var y = [];

  var colors = [];
  for(var i = 0; i < N; i++) colors.push(color1Light);

  eventData.points.forEach(function(pt) {
    x.push(pt.x);
    y.push(pt.y);
    colors[pt.pointNumber] = color1;
  });

  Plotly.restyle(graphDiv, {
    x: [x, y],
    xbins: {}
  }, [1, 2]);

  Plotly.restyle(graphDiv, 'marker.color', [colors], [0]);
});




/*

    fetch('/click_handler', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x: data.points[0].x.toPrecision(4), y: data.points[0].y.toPrecision(4) }),
    })
    .then(response => response.json())
    .then(data => console.log(data.message));

  var pn='',
      tn='',
      colors=[];
  for(var i=0; i < data.points.length; i++){
    pn = data.points[i].x;
    tn = data.points[i].y;
    colors = data.points[i].data.marker.color;
  };
  colors[pn] = '#C54C82';

  var update = {'marker':{color: colors, size:16}};
  Plotly.update('plot_div', {marker: {color: color}}, [index]);
  alert(123);

  */
//});