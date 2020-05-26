// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as importedData
d3.json("./data/samples.json").then(function(importeddata){
    console.log(importeddata.metadata);

                    
    //sorts id val
    function desende(a,b) {
        if(a.sample_values === undefined){
            return b-a;
        } else {

            return b.sample_values[0] - a.sample_values[0];
        }
    };


    //convert string to integer
    // var fatNames - importeddata.names.map(name => parseInt(name))
    var fatNames = importeddata.names.map(name => parseInt(name));
    var parsedNames = importeddata.names.map(function(name){
        return parseInt(name)
    });

    //inividual to look at when query
    var personofInterest = '1242';

    //function to pull individual from samples
    var individual = importeddata.samples.filter(function(sample){
        return sample.id === personofInterest;
    })[0];
    
    console.log(importeddata.metadata);
    var individualMETA = importeddata.metadata.filter(function(sample){
        console.log(sample.id);
        return sample.id === parseInt((personofInterest));
    })[0];

    console.log("META Data");
    console.log(individualMETA);

    var qty = 10;
    var trace1 = {
        x: individual['sample_values'].slice(0,qty),
        y: individual['otu_ids'].sort(desende).slice(0,qty),
        text: individual['otu_labels'].slice(0,qty),
        name: "BellyButton Stuff for:  ",
        type: "bar",
        orientation : "h"
    };

    var trace2 = {
        x:individual['otu_ids'],
        y: individual['sample_values'],
        mode:'markers',
        marker:{
            size: individual['sample_values']
        },
        text: individual['otu_labels'],
        color: individual['otu_ids'],
        names: "Belly Button Bubbles for:  "
                       
    };

    var chartData1 = [trace1];
    var chartData2 = [trace2];
    var layout = {
        title: "Belly Button Stuffings...",
        margin: {
            l:50,
            r:50,
            t:50,
            b:50
        }
    };

    Plotly.newPlot("plot1", chartData1, layout);
    Plotly.newPlot("plot2", chartData2, layout);

});

