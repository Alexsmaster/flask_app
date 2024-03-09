"use strict";

async function getTraceData() {
  let url = '/draw/data_request';
    try {
        let resp = await fetch(url);
        console.log('comment: getTraceData >>>> fetch()');
        // console.log(response.status); 
        // console.log(response.statusText);
        return await resp.json();
    } catch (error) {
        console.log('comment: getTraceData >>>> fetch()');
        console.log(error);
    }
}

async function postJSON(data) {
  let url = "/api/push_points_change_color";
  try {
    const response = await fetch(url, {
      method: "POST", // or 'PUT'
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    // Plotly.restyle('plot_div', {selectedpoints: [null]});
    const result = await response.json();
    console.log("comment: postJSON >>>> fetch()", result);
  } catch (error) {
    console.error("Error: postJSON >>>> fetch():", error);
  }
}


async function myFunc() {
  var selectedPoints;

  

  let data_trace = await getTraceData();
  trace.x =            await data_trace.points.x;
  trace.y =            await data_trace.points.y;
  trace.marker.color = await data_trace.points.color;

  var data = await [trace];
  Plotly.newPlot('plot_div', data, layout, config);

  console.log(layout);

  //-----------------------------------------------------------
  myPlot.on('plotly_selected', function(eventData) {
    if(eventData == undefined || (eventData.points.length < 1)){
      
      console.log('plotly_selected - Nothing is selected');
      // console.log("Nothing is selected, make all points at full opacity again");
      $("#plotly_selected .select-outline").remove();
      Plotly.restyle('plot_div', data.marker);

    } else {

      console.log('plotly_selected');
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
        trace.marker.color[each.pID] = colorToPush;
      }
      console.log(layout);
      layout.datarevision =  layout.datarevision + 1;
      console.log(eventData);
      // eventData = null;
      console.log(data);
      // layout.selections = [null];
      Plotly.update('plot_div', data, layout, config);
      // Plotly.restyle('plot_div', {selectedpoints: [null]});
      // Plotly.newPlot('plot_div', data, layout, config);
      // Plotly.redraw('plot_div');
      // Plotly.react('plot_div', data, layout, config);
      console.log('plotly_selected_done');

    }
  });

  //-----------------------------------------------------------

  myPlot.on('plotly_click', function(eventData) {
    console.log('plotly_click');

    // selectedPoints = eventData.points;
    // var pointsFiltered = selectedPoints.map((item) => {
    //   return {
    //     x: item.x,
    //     y: item.y,
    //     color: colorToPush, //item["marker.color"],
    //     pID: item.pointIndex
    //   }
    // });
    // // console.log('done');
    // postJSON(pointsFiltered); //pushing selected items to server

    // const iterator = pointsFiltered.values();
    // for (const each of iterator) {
    //   trace.marker.color[each.pID] = colorToPush;
    // }
    
    // console.log(layout);
    // layout.datarevision =  layout.datarevision + 1;
    // console.log(eventData);

    // Plotly.update('plot_div', data, layout, config);
    // Plotly.restyle('plot_div', {selectedpoints: [null]});
    // Plotly.reload('plot_div', data, layout, config);
    // console.log('done');
    console.log('plotly_click_done');
  });

  //-----------------------------------------------------------

  myPlot.on('plotly_hover', function(data){

    // Plotly.restyle('plot_div', data, update_layout);
    console.log('plotly_hover');
  });
}
var myPlot = document.getElementById('plot_div');
myFunc();



