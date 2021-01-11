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
            // extract top 10 values/otu ids/labels and do some fixing up
            const sampleValues = subjectData.sample_values.slice(0, 10).reverse();
            const otuIDs = subjectData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
            const otuLabels = subjectData.otu_labels.slice(0, 10).map(label => label.split(';').join(', ')).reverse()
            // create bar chart
            createBarChart(sampleValues, otuIDs, otuLabels, subjectID);
        })
        .catch(err => console.error(err))
}

function createBarChart(sampleValues, otuIDs, otuLabels, subjectID) {
    const barTrace = [
        {
            x: sampleValues,
            y: otuIDs,
            text: otuLabels,
            type: 'bar',
            orientation: 'h'
        }
    ]
    const barLayout = {
        title: `Subject ${subjectID} top ${sampleValues.length} OTUs`,
        xaxis: {title: 'Value'}
    }
    Plotly.react("bar", barTrace, barLayout);
}
