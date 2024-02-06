"use strict";
document.addEventListener("DOMContentLoaded", function(){
//    let plot_div = document.getElementById('plot_div');
//    Plotly.newPlot('plot_div', data, layout);
});

var trace1 = {
      x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'rgba(120, 20, 130, 1)', size: 8},
      selected: {
        marker: {
          color: '#ff0000',
          opacity: 0.8
        }
      },
      // unselected: {
      //   marker: {
      //     color: '#00ff00',
      //     opacity: 0.5
      //   }
      // }

};

var trace2 = {
  x: [203, 304, 456, 564],
  y: [169, 576, 118, 900],
  mode: 'markers',
  type: 'scatter'
};

var trace3 = {
  x: [123, 243, 311, 474],
  y: [125, 986, 155, 129],
  mode: 'lines+markers',
  type: 'scatter'
};


var layout = {
  title: 'Responsive to window\'s size!',
  hovermode:'closest',
  font: {size: 19},
  clickmode: 'select',
  selected: {
    marker: {
      color: '#ff0000',
      opacity: 0.8
    }
  },
  // activeselection: {
  //   fillcolor: "rgba(0,255,255,0)"
  // },
  // showlegend: true,
  // autosize: true,
  height: 700,
  width: 700
  
};

var config = {
  // toImageButtonOptions: {
  //   format: 'svg', // one of png, svg, jpeg, webp
  //   filename: 'custom_image',
  //   height: 900,
  //   width: 700,
  //   scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
  // },

  modeBarButtonsToAdd: [
    {
      name: 'color toggler',
//      icon: icon1,
      click: function(gd) {
        var newColor = colors[Math.floor(3 * Math.random())]
        Plotly.restyle(gd, 'line.color', newColor)
      }
    },

    {
      name: 'button1',
      icon: Plotly.Icons.pencil,
      direction: 'up',
      click: function(gd) {
        alert('button1')
      }
    }
  ],
  modeBarButtonsToRemove: ['pan2d','select2d','lasso2d','resetScale2d','zoomOut2d'],
  displayModeBar: true,
  scrollZoom: true,
  responsive: true,
  aspectratio: 1,
  baseratio:1
//  ,
//  ,
//  ,
};




var data = [trace1, trace2,trace3];


console.log('P3', trace1);


$.get("/draw/data_request", (data1, status) => {
  trace1.x = data1.points.x;
  trace1.y = data1.points.y;
//  Plotly.react('plot_div', data, layout);
  Plotly.newPlot('plot_div', data, layout, config);
  myPlot.on('plotly_click', function(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){
        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
    }
//    alert('Closest point clicked:\n\n'+pts);
});
});

var myPlot = document.getElementById('plot_div');

myPlot.on('plotly_doubleclick', function(data){
  var orgColors = ['#00000','#00000','#00000',
                   '#00000','#00000','#00000'];
  var update = {'marker':{color: orgColors, size:16}};
  Plotly.restyle('myDiv', update);
});