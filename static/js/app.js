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
            createBarChart(dropdown.node().value);
        })
})

function createBarChart(subjectID) {
    d3.json('./data/samples.json')
        .then(res => {
            const subjectData = res.samples.find(sample => sample.id == subjectID);
            const subjectMeta = res.metadata.find(subject => subject.id == subjectID);
            const data = [
                {
                    x: subjectData.sample_values.slice(0, 10).reverse(),
                    y: subjectData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
                    text: subjectData.otu_labels.slice(0, 10).map(label => label.split(';').join(', ')).reverse(),
                    type: 'bar',
                    orientation: 'h'
                }
            ]
            const layout = {
                title: `Subject ${subjectID} top ${data[0].x.length} OTUs`,
                xaxis: { title: 'Value' }
            }
            Plotly.react("bar", data, layout);
        })
        .catch(err => console.error(err))
}

function optionChanged(subjectID) {
    createBarChart(subjectID)
}