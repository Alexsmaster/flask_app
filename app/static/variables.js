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

var colorToPush = "#FF0000";
//declare trace
var trace = {
  x: [],
  y: [],
  type: 'scattergl',
  mode: 'markers',
  marker: {
    color: [],
    size: 10,
  },

  selected: {
      marker: {
        opacity: 1,
        size: 10,
      }
  },

  unselected: {
        marker: {
          opacity: 0.6,
          size: 6,
        }
  },



};


//declare layout
var layout = {
  datarevision: 1,  //
  autosize: true,
  frameMargins: 0.1,
  autoexpand: true,
  margin: {         //specify margins around plot figure
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
  uirevision: true,         //allow restyle method
  hovermode: 'closest',
  dragmode: 'select',
  clickmode: 'event+select',

};

var config = {
  displayModeBar: true,       //topright buttons menu
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
      name: 'changeColorToRed',
      attr: 'changeColor',
      title: 'Select as Red',
      icon: iconCircleRed,
      click: function() {
        colorToPush = "#FF0000"
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
  ],
};
