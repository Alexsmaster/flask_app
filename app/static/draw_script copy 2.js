"use strict";

document.addEventListener('DOMContentLoaded', function() {

var selectedPoints;


var trace1 = {
      x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      marker: {color: [], size: 10}, //'rgba(250, 20, 130, 1)'

};





var layout = {
  title: 'Responsive to window\'s size!',
  hovermode:'closest',
  font: {size: 19},
  selected: [1,2,3,4,5,6,7,8,9,10],
    autosize: true,
  margin: {
    l: 1,
    r: 1,
    b: 1,
    t: 1,
  },
  bargroupgap: 0.95,
  // activeselection: {
  //   fillcolor: "rgba(0,255,255,0.2)"
  // },
  // showlegend: true,
  // autosize: true,
  // height: 700,
  // width: 700
  dragmode: 'select',
  clickmode: 'event+select',
  // uirevision:'true',
  
};


var config = {
  
  // toImageButtonOptions: {
  //   format: 'svg', // one of png, svg, jpeg, webp
  //   filename: 'custom_image',
  //   height: 900,
  //   width: 700,
  //   scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
  // },
//  uirevision:true,

  modeBarButtonsToAdd: [
    'tooglehover',
    'eraseshape',
    'resetScale2d',
    {
      name: 'color toggler',
//      icon: icon1,
      click: function(gd) {
        var newColor = colors[Math.floor(3 * Math.random())]
        Plotly.restyle(gd, 'line.color', newColor)
      }
    },

    {
      name: 'reset selection',
      icon: Plotly.Icons.undo,
      direction: 'down',
      click: function() {
        // Plotly.restyle(myPlot, {selectedpoints: [null],activeselection: false});
        // Plotly.restyle(myPlot, layout_stock, markerOldColors, [0]);
        // Plotly.react('plot_div', data, {selectedpoints: [null]}, config);
        Plotly.restyle(myPlot, 'selectedpoints', null);
        // Plotly.react('plot_div', data, layout);
        console.log('button pressed');
      }
    }, 

    {
      name: 'download',
      attr: 'download',
      title: 'Download as Image',
      icon: {
        width: 10, height: 10,
        path: 'M 0 0 l 10 0 V 10 l -10 0 L 9 9 V 1 z M 1 1 L 8 2 L 8 8 L 1 9 L 1 8 L 7 7 L 7 3 L 1 2 L 1 1'
      },
      click: function() {
        console.log(selectedPoints.keys());
        const pointsFiltered = selectedPoints.map((item) => {
          return { x: item.x, y: item.y }
        });
        selectedPoints['marker.color'] = '#FFFF00';
        
        $.ajax({
          type: "POST", 
          url: "http://192.168.88.221:5000/api/push_points_change_color", //localhost Flask
          data : JSON.stringify(pointsFiltered),
          contentType: "application/json",
        }).then(function(){
            $.get("/draw/data_request", (data1, status) => {
            trace1.x = data1.points.x;
            trace1.y = data1.points.y;
            trace1.marker.color = data1.points.color;
            //  console.log(data1.points.color);
            Plotly.react('plot_div', data, layout, config);
            });
          

        });     
      }
    }
  ],

  modeBarButtonsToRemove: [], //'select2d', ,'lasso2d','pan2d','resetScale2d','zoomOut2d'
  displayModeBar: true,
  doubleClick: 'reset',
  // doubleClick: false,
  displaylogo: false,
  scrollZoom: true,
  responsive: true,
  // aspectratio: 1,
  // baseratio:1
//  ,
//  ,
//  ,
};


var data = [trace1]; //, trace2,trace3


Plotly.newPlot('plot_div', data, layout, config);



var myPlot = document.getElementById('plot_div');


  // myPlot.on("plotly_selected", function(eventData) {

  //   console.log('plotly_selected',eventData);
  //   selectedPoints = eventData.points;

  //   const pointsFiltered = selectedPoints.map((item) => {
  //     return { x: item.x, y: item.y ,color: item["marker.color"]}
  //   })
  //   // var myPlot_temp = document.getElementById('plot_div');
  //   console.log('pointsFiltered: ',pointsFiltered);

  //   // console.log('plotly_selected');
  //   // var eventData = {points: selectedPoints};
  //   // myPlot.emit('plotly_selected', eventData);
  // });

  myPlot.on('plotly_selected', function(eventData) {

    console.log('plotly_selected',eventData);
    // console.log('eventData.points',eventData.points);

    selectedPoints = eventData.points;

    var pointsFiltered = selectedPoints.map((item) => {
        console.log('item',item);
        return { x: item.x, y: item.y ,color: item["marker.color"]}
    })

    // var myPlot_temp = document.getElementById('plot_div');

    // console.log('pointsFiltered: ',pointsFiltered);

    var x = [];
    var y = [];

    var colors = [];
    // for(var i = 0; i < trace1.x.entries; i++) colors.push(color1Light);

//    eventData.points.forEach(function(pt) {
//      x.push(pt.x);
//      y.push(pt.y);
//      colors[pt.pointNumber] = '#ff0000';
//    });
//    console.log('colors: ', colors.length);
//    console.log('colors: ',  eventData.points.length);


//    Plotly.restyle(myPlot, 'marker.color', [colors], [0]);

  });




// console.log("test", data.marker);
// myPlot.on('plotly_selected', function(eventData) {
//   console.log("remove select-outline select-outline-2 and 1", eventData);
//   if(eventData == undefined || (eventData.points.length < 1)){
//   	console.log("Nothing is selected, make all points at full opacity again");
//   	$("#plot_div .select-outline").remove();
//     Plotly.restyle('plot_div', data.marker, layout, config);

//   } else {
//    	console.log("Dont remove selection box");
//   }
// });




  // graphDiv.on('plotly_selected', function(eventData) {

  //   var colors = [];
  //   for(var i = 0; i < N; i++) colors.push(color1Light);

  //   console.log(eventData.points)

  //   eventData.points.forEach(function(pt) {
  //     x.push(pt.x);
  //     y.push(pt.y);
  //     colors[pt.pointNumber] = color1;
  //   });


  //   Plotly.restyle(graphDiv, 'marker.color', [colors], [0]);
  // });



  // myPlot.on('plotly_click', function(eventData) {
  //   selectedPoints = eventData.points;
  //   console.log('plotly_click');
  //   console.log('selectedPoints ', selectedPoints[0]["x"], selectedPoints[0]["y"], selectedPoints[0]["marker.color"], eventData );

  // });


  // myPlot.on("plotly_doubleclick", function(eventData) {
  //   console.log('plotly_doubleclick');
  //   // var update = {'marker':{color: '#000000', size:8}};
  //   // Plotly.restyle(myPlot, 'layout.selections', [null], [0]);
  //   Plotly.restyle(myPlot, 'marker.color', markerOldColors, [0]);
  // });


  // myPlot.on('plotly_doubleclick', function(data){
  //   var orgColors = ['#00000','#00000','#00000',
  //                    '#00000','#00000','#00000'];
  //   var update = {'marker':{color: orgColors, size:16}};
  //   Plotly.restyle('myDiv', update);
  // });


  // Plotly.restyle(myPlot, {selectedpoints: [null]});

// document.addEventListener("DOMContentLoaded", function(){
//   //    let plot_div = document.getElementById('plot_div');
//   //    Plotly.newPlot('plot_div', data, layout);
//   var myPlot = document.getElementById('plot_div');

//   myPlot.on("plotly_selected", function(eventData) {
//     var selectedPoints = eventData.points;
//     console.log(selectedPoints);
//   });



//   });

// var color1 = '#7b3294';
// myPlot.on('plotly_selected', function(eventData) {
//   var x = [];
//   var y = [];

//   var colors = [];
//   for(var i = 0; i < N; i++) colors.push(color1Light);

//   console.log(eventData.points)

//   eventData.points.forEach(function(pt) {
//     x.push(pt.x);
//     y.push(pt.y);
//     colors[pt.pointNumber] = color1;
//   });

//   Plotly.restyle(graphDiv, {
//     x: [x, y],
//     xbins: {}
//   }, [1, 2]);

//   Plotly.restyle(graphDiv, 'marker.color', [colors], [0]);
// });

// var dict = {username : "username" , password:"password"};


$.get("/draw/data_request", (data1, status) => {
  trace1.x = data1.points.x;
  trace1.y = data1.points.y;
  trace1.marker.color = data1.points.color;
//  console.log(data1.points.color);
  Plotly.react('plot_div', data, layout, config);
});
// var markerOldColors = trace1.marker.color;


var deselectButton = document.getElementById('deselectButton');


deselectButton.addEventListener('click', function() {
  // Сбросьте выделение на графике
  $.get("/draw/data_request", (data1, status) => {
  trace1.x = data1.points.x;
  trace1.y = data1.points.y;
  trace1.marker.color = data1.points.color;
  //  console.log(data1.points.color);
  Plotly.react('plot_div', data, layout, config);
   });
  // layout['selectedpoints'] =  null;
//  layout['dragmode'] =  'box';
//
//  Plotly.restyle(myPlot, data, layout, config);
//  Plotly.relayout(myPlot, {
//    'xaxis.autorange': true,
//    'yaxis.autorange': true
//  });
});

});