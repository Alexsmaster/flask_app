"use strict";

var selectedPoints;

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
  hovermode: 'closest',
  font: {
    size: 14
  },
  autosize: true,
  margin: {
    l: 45,
    r: 20,
    b: 60,
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
  dragmode: 'select',
  clickmode: 'event+select',

};

var config = {
  modeBarButtonsToAdd: [
    'tooglehover',
    'eraseshape',
    'resetScale2d',
    {
      name: 'download',
      attr: 'download',
      title: 'Download as Image',
      icon: {
        width: 10,
        height: 10,
        path: 'M 0 0 l 10 0 V 10 l -10 0 L 9 9 V 1 z M 1 1 L 8 2 L 8 8 L 1 9 L 1 8 L 7 7 L 7 3 L 1 2 L 1 1'
      },
      click: function() {
        console.log(selectedPoints.keys());
        const pointsFiltered = selectedPoints.map((item) => {
          return {
            x: item.x,
            y: item.y
          }
        });
        selectedPoints['marker.color'] = '#FFFF00';

        $.ajax({
          type: "POST",
          url: "/api/push_points_change_color", //localhost Flask
          data: JSON.stringify(pointsFiltered),
          contentType: "application/json",
        }).then(function() {
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
  doubleClickDelay: 500,
  displaylogo: false,
  scrollZoom: false,
  responsive: true,

};

var data = [trace1]; //, trace2,trace3

document.addEventListener('DOMContentLoaded', function() {

  Plotly.newPlot('plot_div', data, layout, config);

  var myPlot = document.getElementById('plot_div');


  myPlot.on('plotly_selected', function(eventData) {

    console.log('plotly_selected', eventData);
    selectedPoints = eventData.points;

    var pointsFiltered = selectedPoints.map((item) => {
      console.log('item', item);
      return {
        x: item.x,
        y: item.y,
        color: item["marker.color"]
      }
    })

    $.ajax({
      type: "POST",
      url: "/api/push_points_change_color", //localhost Flask
      data: JSON.stringify(pointsFiltered),
      contentType: "application/json",
    }).then(function() {
      $.get("/draw/data_request", (data1, status) => {
        trace1.x = data1.points.x;
        trace1.y = data1.points.y;
        trace1.marker.color = data1.points.color;
        Plotly.react('plot_div', data, layout, config);
      });

    });

  });


  
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
      Plotly.restyle('plot_div', data, layout, config);
    });

  });
});