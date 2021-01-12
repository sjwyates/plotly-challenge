window.addEventListener('DOMContentLoaded', () => {
    d3.json('./data/samples.json')
        .then(res => {
            const dropdown = d3.select('#selDataset')
            res.names.forEach(name => {
                dropdown.append('option')
                    .text(name)
                    .node()
                    .value = name
            })
            createCharts(dropdown.node().value);
        })
})

function optionChanged(subjectID) {
    createCharts(subjectID);
}

function createCharts(subjectID) {
    d3.json('./data/samples.json')
        .then(res => {
            // find subject data and metadata
            const subjectData = res.samples.find(sample => sample.id == subjectID);
            const subjectMeta = res.metadata.find(subject => subject.id == subjectID);
            // call create methods
            createBarChart(subjectData);
            createBubbleChart(subjectData);
            addDemographicInfo(subjectMeta);
            createGaugeChart(subjectMeta);
        })
        .catch(err => console.error(err))
}

function createBarChart(subjectData) {
    // extract top 10 values, otu ids, labels and do some fixing up
    const sampleValues = subjectData.sample_values.slice(0, 10).reverse();
    const otuIDs = subjectData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const otuLabels = subjectData.otu_labels.slice(0, 10).map(label => label.split(';').join(', ')).reverse()
    // create bar chart
    const trace = [
        {
            x: sampleValues,
            y: otuIDs,
            text: otuLabels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: '#b185a7'
            }
        }
    ]
    const layout = {
        title: `Subject ${subjectData.id} top ${sampleValues.length} OTUs`,
        xaxis: {title: 'Value'}
    }
    Plotly.react("bar", trace, layout);
}

function createBubbleChart(subjectData) {
    const trace = [
        {
            x: subjectData.otu_ids,
            y: subjectData.sample_values,
            text: subjectData.otu_labels.map(label => label.split(';').join(', ')),
            marker: {
                size: subjectData.sample_values,
                color: subjectData.otu_ids
            },
            mode: 'markers',
        }
    ]
    const layout = {
        title: `Subject ${subjectData.id} values`,
        showlegend: false,
        xaxis: {title: 'OTU ID'},
        yaxis: {title: 'Value'}
    }
    Plotly.react("bubble", trace, layout);
}

function addDemographicInfo(subjectMeta) {
    const ul = d3.select('#sample-metadata');
    ul.selectAll('li').remove();
    ul.selectAll('li')
        .data(Object.entries(subjectMeta))
        .enter()
        .append('li')
        .attr('class', 'list-group-item')
        .text(data => `${data[0]}: ${data[1]}`);
}

// ----------------------------------------------------------
// BONUS - adapted from https://codepen.io/ascotto/pen/eGNaqe
// ----------------------------------------------------------
function createGaugeChart(subjectMeta) {

    function gaugePointer(value) {

        const degrees = 180 - value * 20,
            radius = .5;
        const radians = degrees * Math.PI / 180;
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);

        const mainPath = 'M -.0 -0.035 L .0 0.035 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        const path = mainPath.concat(pathX, space, pathY, pathEnd);
        return path;
    }

    const data = [
        {
            x: [0],
            y: [0],
            marker: {size: 18, color: '850000'},
            showlegend: false,
            name: 'wash frequency',
            text: 10,
            hoverinfo: 'text+name'
        },
        {
            values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: 'text',
            textposition: 'inside',
            marker: {
                colors: ["#8d6b94", "#a37595", "#b48095", "#c28e97", "#cd9c9b",
                    "#d6aba1", "#ddbbaa", "#e2cbb6", "#e8dbc5", "#ffffff"]
            },
            labels: ["Too Much", "Better", "Good", "Decent", "OK", "Eww", "Ewww", "Ewwww", "Ewwwww", ""],
            hoverinfo: 'label',
            hole: 0.5,
            type: 'pie',
            showlegend: false
        }
    ];
    const layout = {
        shapes: [{
            type: 'path',
            path: gaugePointer(subjectMeta.wfreq),
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        title: '<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week',
        autosize: true,
        xaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        },
        yaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        }
    };
    Plotly.react('gauge', data, layout);
}