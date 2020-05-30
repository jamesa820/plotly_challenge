
function optionChanged(sel) {
        console.log(sel);
        var personSelected = parseInt(sel);
       
        getData(personSelected);
    };
function getData(personofInterest) {
    d3.json("./data/samples.json").then(function (importeddata) {
       
        function desende(a, b) {
            if (a.sample_values === undefined) {
                return b - a;
            } else {
                return b.sample_values[0] - a.sample_values[0];
            }
        } 
        console.log(personofInterest);
        ray

        var individual = importeddata.samples.filter(function (sample) {
            return sample.id === String(personofInterest);
        })[0];
        
        console.log(importeddata.metadata);
        var individualMETA = importeddata.metadata.filter(function (sample) {
        
            return sample.id === parseInt((personofInterest));
        })[0];




        var metaData = document.querySelector(".metaspot");
        var metatoDisplay = JSON.stringify(individualMETA, null, 4);
        // console.log(metaData);
        metaData.innerText = metatoDisplay;

        ///////////////////////////////////////////////////////////////////

       renderGraphs(individual);
    }); 
};

function buildSelector() {
    d3.json("./data/samples.json").then(function (importeddata) {
        var persontoget = document.querySelector("#selDataset");
        var names = importeddata.names;
        names.forEach(function (name) {
            let option = document.createElement("option");
            option.value = name;
            option.innerText = name;
            persontoget.append(option);
        });
    });
};
function renderGraphs(individual){
    function desende(a, b) {
            if (a.sample_values === undefined) {
                return b - a;
            } else {
                return b.sample_values[0] - a.sample_values[0];
            }
        } 
     var qty = 10;
        var trace1 = {
            x: individual['sample_values'].slice(0, qty),
            y: individual['otu_ids'].sort(desende).slice(0, qty),
            text: individual['otu_labels'].slice(0, qty),
            name: "BellyButton Stuff for:  ",
            type: "bar",
            orientation: "h"
        };
        var trace2 = {
            x: individual['otu_ids'],
            y: individual['sample_values'],
            mode: 'markers',
            marker: {
                size: individual['sample_values']
            },
            text: individual['otu_labels'],
            color: individual['otu_ids'],
            name: "BellyButton Bubbles for:  "
        };
        var chartData1 = [trace1];
        var chartData2 = [trace2];
        var layout1 = {
            title: "Belly Button Stuffings...",
            margin: {
                l: 50,
                r: 50,
                t: 50,
                b: 50
            }
        };
        var layout2 = {
            title: "Belly Button Bubbles...",
            margin: {
                l: 50,
                r: 50,
                t: 50,
                b: 50
            }
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot1", chartData1, layout1);
        Plotly.newPlot("plot2", chartData2, layout2);

}
buildSelector();
getData(962);

