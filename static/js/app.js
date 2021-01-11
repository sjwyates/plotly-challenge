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
            orientation: 'h'
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
    const div = d3.select('#sample-metadata');
    for (const [key, value] of Object.entries(subjectMeta)) {
        div.append('p').text(`${key}: ${value}`)
    }
}