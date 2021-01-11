function createGaugeChart(subjectMeta) {
    const level = 10;

    function gaugePointer(value) {

        const degrees = 180 - value * 20,
            radius = .5;
        const radians = degrees * Math.PI / 180;
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
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
            text: level,
            hoverinfo: 'text+name'
        },
        {
            values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: 'text',
            textposition: 'inside',
            marker: {
                colors: ['rgb(14, 127, 0, 0.5)', 'rgb(68, 139, 29, 0.5)',
                    'rgb(101, 150, 51, 0.4)', 'rgb(129, 162, 74, 0.4)',
                    'rgb(154, 173, 97, 0.3)', 'rgb(177, 186, 121, 0.3)',
                    'rgb(198, 198, 147, 0.2)', 'rgb(216, 212, 174, 0.2)',
                    'rgb(232, 226, 202, 0.1)', 'rgba(255, 255, 255, 0)']
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