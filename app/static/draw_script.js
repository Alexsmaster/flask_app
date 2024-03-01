"use strict";

var selectedPoints;

var colorToPush = "#FF0000";









var iconCircleRed = {
  svg: [
    '<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'>',
    '<defs>',
    ' <style>',
    '  .cls-0{fill:#FF0000;}',
    ' </style>',
    '</defs>',
    ' <title>Circles</title>',
    ' <g id=\'symbol\'>',
    '  <circle class=\'cls-0\' cx=\'100\' cy=\'100\' r=\'100\'/>',
    ' </g>',
    '</svg>'
  ].join('')
};

var iconCircleGreen = {
  svg: [
    '<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'>',
    '<defs>',
    ' <style>',
    '  .cls-1{fill:#00FF00;}',
    ' </style>',
    '</defs>',
    ' <title>Circles</title>',
    ' <g id=\'symbol\'>',
    '  <circle class=\'cls-1\' cx=\'100\' cy=\'100\' r=\'100\'/>',
    ' </g>',
    '</svg>'
  ].join('')
};

var iconCircleBlue = {
  svg: [
    '<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'>',
    '<defs>',
    ' <style>',
    '  .cls-2{fill:#0000FF;}',
    ' </style>',
    '</defs>',
    ' <title>Circles</title>',
    ' <g id=\'symbol\'>',
    '  <circle class=\'cls-2\' cx=\'100\' cy=\'100\' r=\'100\'/>',
    ' </g>',
    '</svg>'
  ].join('')
};

var iconCircleDarkGray = {
  svg: [
    '<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'>',
    '<defs>',
    ' <style>',
    '  .cls-3{fill:#333333;}',
    ' </style>',
    '</defs>',
    ' <title>Circles</title>',
    ' <g id=\'symbol\'>',
    '  <circle class=\'cls-3\' cx=\'100\' cy=\'100\' r=\'100\'/>',
    ' </g>',
    '</svg>'
  ].join('')
};

var trace1 = {
  x: [],
  y: [],
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: [],
    size: 10
  }, //'rgba(250, 20, 130, 1)'

};

var layout = {
  // title: 'Responsive to window\'s size!',
  // font: {
  //   size: 14
  // },
  //  width: 320, height: 240,
  autosize: true,
  frameMargins: 0.1,
  autoexpand: true,
  margin: {
    l: 45,
    r: 20,
    b: 40,
    t: 30,
  },
  xaxis: {
    automargin: true,
    autorange: true,
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    // ticks: '',
    showticklabels: true
  },
  yaxis: {
    automargin: true,
    autorange: true,
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    // ticks: '',
    showticklabels: true
  },
  uirevision: true,
  hovermode: 'closest',
//  dragmode: 'select',
  clickmode: 'event+select',

};

var config = {
  displayModeBar: true,
  doubleClick: 'reset',
  doubleClickDelay: 400,
  displaylogo: false,
  scrollZoom: false,
  responsive: true,

  //  modebar: {
  //    orientation: ‘h’,
  //    bgcolor: ‘#ffffff’,
  //    color:‘red’,
  //    activecolor:‘red’,
  //    position: ‘left’
  //  },
  modeBarButtonsToRemove: [], //'select2d', ,'lasso2d','pan2d','resetScale2d','zoomOut2d'
  modeBarButtonsToAdd: [
    'tooglehover',
    'eraseshape',
    'resetScale2d',

    {
      name: 'changeColorToGreen',
      attr: 'changeColor',
      title: 'Select as  Green',
      icon: iconCircleGreen,
      click: function() {
        colorToPush = "#00FF00"
      }
    },
    {
      name: 'changeColorToBlue',
      attr: 'changeColor',
      title: 'Select as Blue',
      icon: iconCircleBlue,
      click: function() {
        colorToPush = "#0000FF"
      }
    },
    {
      name: 'changeColorToDarkGray',
      attr: 'changeColor',
      title: 'Select as DarkGray',
      icon: iconCircleDarkGray,
      click: function() {
        colorToPush = "#333333";

      }
    },
    {
      name: 'changeColorToRed',
      attr: 'changeColor',
      title: 'Select as Red',
      icon: iconCircleRed,
      click: function() {
        colorToPush = "#FF0000"
      }
    },

    //    {
    //      name: 'download',
    //      attr: 'download',
    //      title: 'Download as Image',
    //      icon: {
    //        width: 10,
    //        height: 10,
    //        path: 'M 0 0 l 10 0 V 10 l -10 0 L 9 9 V 1 z M 1 1 L 8 2 L 8 8 L 1 9 L 1 8 L 7 7 L 7 3 L 1 2 L 1 1'
    //      },
    //      click: function() {
    //        console.log(selectedPoints.keys());
    //        const pointsFiltered = selectedPoints.map((item) => {
    //          return {
    //            x: item.x,
    //            y: item.y
    //          }
    //        });
    //        selectedPoints['marker.color'] = '#FFFF00';
    //
    //        $.ajax({
    //          type: "POST",
    //          url: "/api/push_points_change_color", //localhost Flask
    //          data: JSON.stringify(pointsFiltered),
    //          contentType: "application/json",
    //        }).then(function() {
    //          $.get("/draw/data_request", (data1, status) => {
    //            trace1.x = data1.points.x;Draw
    //            trace1.y = data1.points.y;
    //            trace1.marker.color = data1.points.color;
    //            //  console.log(data1.points.color);
    //            Plotly.react('plot_div', data, layout, config);
    //          });
    //
    //        });
    //      }
    //    }
  ],
};

//var data = [trace1]; //, trace2,trace3
var data = [trace1];


async function ask_server() {
  const response = await fetch("/draw/data_request");
  const data2 = await response.json();
  trace1.x = data2.points.x;
  trace1.y = data2.points.y;
  trace1.marker.color = data2.points.color;
  Plotly.update('plot_div', data, layout, config);
   //, trace2,trace3
//  alert("done");
}

async function postJSON(data) {
  try {
    const response = await fetch("/api/push_points_change_color", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
//    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}



ask_server();

//requestAnimationFrame(() => {
//    requestAnimationFrame(() => {
//
//    });
//});

Plotly.newPlot('plot_div', data, layout, config);

var myPlot = document.getElementById('plot_div');


myPlot.on('plotly_selected', function(eventData) {
  selectedPoints = eventData.points;
  var pointsFiltered = selectedPoints.map((item) => {
    return {
      x: item.x,
      y: item.y,
      color: colorToPush, //item["marker.color"],
      pID: item.pointIndex
    }
  });

  postJSON(pointsFiltered); //pushing selected items to server
  const iterator = pointsFiltered.values();
  for (const each of iterator) {
    trace1.marker.color[each.pID] = colorToPush;
  }
  Plotly.update('plot_div', data, layout, config);
});


myPlot.on('plotly_click', function(eventData) {
  selectedPoints = eventData.points;
  var pointsFiltered = selectedPoints.map((item) => {
    return {
      x: item.x,
      y: item.y,
      color: colorToPush, //item["marker.color"],
      pID: item.pointIndex
    }
  });

  postJSON(pointsFiltered); //pushing selected items to server
  const iterator = pointsFiltered.values();
  for (const each of iterator) {
    trace1.marker.color[each.pID] = colorToPush;
  }
  Plotly.update('plot_div', data, layout, config);
});
