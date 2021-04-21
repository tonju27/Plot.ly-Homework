// Homework includes some sections from homework review by instructor
console.log("app.js loaded");

function initDashboard() {
console.log("initDashboard()");

// Populate the dropdown

var selector = d3.select("#selDataset");
d3.json("samples.json").then(function(data) {

    console.log(data);

});



// Update the bargraph
// UPdate the bubblechart
// Update the demographic information



}

initDashboard();

