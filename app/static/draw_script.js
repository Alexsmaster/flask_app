"use strict";
document.addEventListener("DOMContentLoaded", function(){
//    let plot_div = document.getElementById('plot_div');
//    Plotly.newPlot('plot_div', data, layout);
});


var selectedPoints;


function parse_plotly_array_of_points(){

}

function cleanStringify(object) {
  if (object && typeof object === 'object') {
      object = copyWithoutCircularReferences([object], object);
  }
  return JSON.stringify(object);

  function copyWithoutCircularReferences(references, object) {
      var cleanObject = {};
      Object.keys(object).forEach(function(key) {
          var value = object[key];
          if (value && typeof value === 'object' && key != ['[[Prototype]]','description']) {
              if (references.indexOf(value) < 0) {
                  references.push(value);
                  cleanObject[key] = copyWithoutCircularReferences(references, value);
                  references.pop();
              } else {
                  cleanObject[key] = '###_Circular_###';
              }
          } else if (typeof value !== 'function') {
              cleanObject[key] = value;
          }
      });
      return cleanObject;
  }
}



var trace1 = {
      x: [],
      y: [],
      type: 'scatter',
      mode: 'markers',
      marker: {color: [], size: 10}, //'rgba(250, 20, 130, 1)'
      selected: {
        marker: {
          color: '#ff0000',
          opacity: 1
        }
      },
      unselected: {
        marker: {
          color: '#0000ff',
          opacity: 1
        }
      }

};

var trace2 = {
  x: [203, 304, 456, 564],
  y: [169, 576, 118, 900],
  mode: 'markers',
  type: 'scatter',
  marker: {color: ['#ff0000', '#ff0000', '#ffFF00', '#ff0000'], size: [20, 30, 50, 30]}, //'rgba(250, 20, 130, 1)'
  selected: {
    marker: {
      color: '#ff0000',
      opacity: 0.8,
      size: [20, 30, 10, 30]
    }
  },
};

var trace3 = {
  x: [123, 243, 311, 474],
  y: [125, 986, 155, 129],
  mode: 'lines+markers',
  type: 'scatter',
  selected: {
    marker: {
      color: '#ff0000',
      opacity: 0.8
    }
  },
};


var layout = {
  title: 'Responsive to window\'s size!',
  hovermode:'closest',
  font: {size: 19},
  clickmode: 'select',
  dragmode: 'lasso',


  activeselection: {
    fillcolor: "rgba(0,255,255,0.2)"
  },
  // showlegend: true,
  // autosize: true,
  // height: 700,
  // width: 700
  
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
      icon: Plotly.Icons.undo,
      direction: 'up',
      click: function(gd) {
        alert('button1')
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
        })

        $.ajax({
          type: "POST", 
          url: "http://127.0.0.1:5000/api/push_points", //localhost Flask
          data : JSON.stringify(pointsFiltered),
          contentType: "application/json",
        });

      }
      
    }
  ],

  modeBarButtonsToRemove: ['pan2d','resetScale2d','zoomOut2d'], //'select2d', ,'lasso2d'
  displayModeBar: true,
  displaylogo: false,
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

Plotly.newPlot('plot_div', data, layout, config);


$.get("/draw/data_request", (data1, status) => {
  trace1.x = data1.points.x;
  trace1.y = data1.points.y;
  Plotly.react('plot_div', data, layout, config);
  // Plotly.newPlot('plot_div', data, layout, config);
 

  // myPlot.on('plotly_click', function(data){
  //   var pts = '';
  //   for(var i=0; i < data.points.length; i++){
  //       pts = 'x = '+data.points[i].x +'\ny = '+
  //           data.points[i].y.toPrecision(4) + '\n\n';
  //   }
  //  alert('Closest point clicked:\n\n'+pts);
  // });

  // myPlot.on('plotly_doubleclick', function(data){
  //   var orgColors = ['#00000','#00000','#00000',
  //                    '#00000','#00000','#00000'];
  //   var update = {'marker':{color: '#00000', size:8}};
  //   Plotly.restyle('plot_div', update);
  // });
  

  
  // Programmatically trigger the selection event


});

var myPlot = document.getElementById('plot_div');

  myPlot.on("plotly_selected", function(eventData) {
    selectedPoints = eventData.points;
    console.log(selectedPoints);
    const pointsFiltered = selectedPoints.map((item) => {
      return { x: item.x, y: item.y }
    })
    console.log(pointsFiltered);
    // var eventData = {points: selectedPoints};
    // myPlot.emit('plotly_selected', eventData);
  });
  myPlot.on("plotly_click", function(eventData) {
    selectedPoints = eventData.points;
    console.log(selectedPoints[0].x,selectedPoints[0].y);
    console.log(selectedPoints);
    // var eventData = {points: selectedPoints};
    // myPlot.emit('plotly_selected', eventData);
  });

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

