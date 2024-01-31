var myPlot = document.getElementById('myDiv'),
x = [1, 2, 3, 4, 5, 6],
    y = [1, 2, 3, 2, 3, 4],
    colors = ['#00000','#00000','#00000',
              '#00000','#00000','#00000'],
    data = [{x:x, y:y, type:'scatter',
             mode:'markers', marker:{size:16, color:colors}}],
    layout = {
        hovermode:'closest',
        title:'Click on a Point to Change Color<br>Double Click (anywhere) to Change it Back'
     };

Plotly.newPlot('myDiv', data, layout);

myPlot.on('plotly_click', function(data){
  var pn='',
      tn='',
      colors=[];
  for(var i=0; i < data.points.length; i++){
    pn = data.points[i].pointNumber;
    tn = data.points[i].curveNumber;
    colors = data.points[i].data.marker.color;
    colors = data.points[i].data.;
  };
  colors[pn] = '#C54C82';

  var update = {'marker':{color: colors, size:16}};
  Plotly.restyle('myDiv', update, [tn]);
});

myPlot.on('plotly_doubleclick', function(data){
  var orgColors = ['#00000','#00000','#00000',
                   '#00000','#00000','#00000'];
  var update = {'marker':{color: orgColors, size:16}};
  Plotly.restyle('myDiv', update);
});
console.dir(document);