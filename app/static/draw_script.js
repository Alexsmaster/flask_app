"use strict";
//document.addEventListener("DOMContentLoaded", function(){
//    let plot_div = document.getElementById('plot_div');
//    x = [1, 2, 3, 4, 5, 6],
//    y = [1, 2, 3, 2, 3, 4],
//    colors = ['#00000','#00000','#00000',
//              '#00000','#00000','#00000'],
//    data = [{x:x, y:y, type:'scatter',
//             mode:'markers', marker:{size:16, color:colors}}],
//    layout = {
//            hovermode:'closest',
//            title:'Click on a Point to Change Color<br>Double Click (anywhere) to Change it Back'
//     };
//
//    Plotly.newPlot('plot_div', data, layout);
//
//
//    alert('Hello');
//
//});


var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  mode: 'markers',
  type: 'scatter'
};

var trace2 = {
  x: [2, 3, 4, 5],
  y: [16, 5, 11, 9],
  mode: 'lines',
  type: 'scatter'
};

var trace3 = {
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  mode: 'lines+markers',
  type: 'scatter'
};


var layout = {
  title: 'Responsive to window\'s size!',
  font: {size: 18}
};

var data = [trace1, trace2, trace3];

Plotly.newPlot('plot_div', data, layout);