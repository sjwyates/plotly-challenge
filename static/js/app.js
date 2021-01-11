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
            console.log(res)
            createBarChart();
        })
})

function createBarChart() {
    const subjectID = d3.select('#selDataset')
        .node()
        .value
    d3.json('./data/samples.json')
        .then(res => {
            const subjectData = res.samples.find(sample => sample.id == subjectID)
            const data = [
                {
                    x: subjectData.sample_values.slice(0, 10),
                    y: subjectData.otu_ids.slice(0, 10)
                }
            ]
            console.log(data)
        })
        .catch(err => console.error(err))

}
