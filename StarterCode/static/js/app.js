// Homework includes some sections from homework review by instructor
console.log("app.js loaded");

function DrawBargraph(sampleId) {
    console.log("DrawBargraph(${sampleId})");

    d3.json("samples.json").then(data => {
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        // console.log(result);
        
        var otu_ids = result.otu_ids;
        // console.log(otu_ids);

        var otu_labels = result.otu_labels;
        // console.log(otu_labels);

        var sample_values = result.sample_values;
        // console.log(sample_values);

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(); //TBO 

        var barData = {
            x: sample_values.slice(0, 10).reverse(), //TBO
            y: yticks,
            type: "bar",
            test: otu_labels.slice(0, 10).reverse(), //TBO
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {l: 100, r: 100, t: 100, b: 100}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });

}

function DrawBubblechart(sampleId) {
    console.log("DrawBubblechart(${sampleId})");

    d3.json("samples.json").then(data => {
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        // console.log(result);
        
        var otu_ids = result.otu_ids;
        // console.log(otu_ids);

        var otu_labels = result.otu_labels;
        // console.log(otu_labels);

        var sample_values = result.sample_values;
        // console.log(sample_values);

    var bubbleData = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        },

    };


    var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: { title: "OTU ID" },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
      };

    var bubbleArray = [bubbleData]

    Plotly.newPlot("bubble", bubbleArray, bubbleLayout); 

});


}

function ShowMetadata(sampleId) {
    console.log("ShowMetadata(${sampleId})");

    d3.json("samples.json").then(data => {
        console.log(data);

        var metadata = data.metadata;
        var resultArray = metadata.filter(meta => meta.id.toString() == sampleId);
        var result = resultArray[0];
        // console.log(result);
        
        var screen = d3.select("#sample-metadata");

        // clear any existing metadata
        screen.html("");

        Object.entries(result).forEach(([key, value]) => {
            screen.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });

}

// Adapted the Gauge Chart from https://plot.ly/javascript/gauge-charts/
function DrawGaugechart(sampleId) {
    console.log("DrawGaugechart(${sampleId})");

    d3.json("samples.json").then(data => {
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        
        var data = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            title: { text: `Weekly Washing Frequency ` },
            type: "indicator",
            mode: "gauge+number+delta",
            gauge: { axis: { range: [null, 9] },
                     steps: [
                      { range: [0, 2], color: "yellow" },
                      { range: [2, 4], color: "cyan" },
                      { range: [4, 6], color: "teal" },
                      { range: [6, 8], color: "lime" },
                      { range: [8, 9], color: "green" },
                    ]}
                
            }
          ];

          var layout = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", data, layout);
      });

}


function optionChanged(newSampleId) {
    console.log("User selected ${newSampleId}");
    // Get new data each time a new sample is selected
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
    DrawGaugechart(newSampleId);
}

function initDashboard() {
    console.log("initDashboard()");

    // Populate the dropdown

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then(data => {
        console.log(data);

    var sampleNames = data.names;

    sampleNames.forEach(sampleId => {
        selector.append("option")
            .text(sampleId)
            .property("value", sampleId)

    });

    var id = sampleNames[0];

    DrawBargraph(id);
    DrawBubblechart(id);
    ShowMetadata(id);
    DrawGaugechart(id);

});



}


initDashboard();

