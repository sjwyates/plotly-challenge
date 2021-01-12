# Plotly Challenge

## Overview

For this project, the goal is to build a data visualization dashboard for a [dataset](http://robdunnlab.com/projects/belly-button-biodiversity) of microbes found in the navels of 153 human subjects. The basic requirements are:

- Static HTML/CSS/JS page with some simple Bootstrap styling
- D3 for DOM traversal/manipulation and extracting data from static JSON file
- Plotly to build bar and bubble charts for a single subject
- Display a list of demographic information about the subject
- Dropdown menu to allow user to select a subject, then rebuild the charts and list
- Deploy to some sort of web hosting service, such as Github Pages 

There is also a bonus challenge to build a gauge chart (although technically it's a pie chart with a shape superimposed for the needle).

You can check out the [finished product](https://sjwyates.github.io/plotly-challenge) on Github Pages. Here's a preview:

![finished product preview](images/finished-product.png)

## Dataset

There are 3 main parts to the dataset. The first is the measurement data for each subject, which is used to build the bar and bubble charts:

```
{
  "id": "940",
  "otu_ids": [
    1167,
    ...
  ],
  "sample_values": [
    163,
    ...
  ],
  "otu_labels": [
    "Bacteria;Bacteroidetes;Bacteroidia",
    ...
  ]
}
```

The second is some metadata about each subject, which is used to build the demographic info list and "gauge" chart:

```
{
  "id": 940,
  "ethnicity": "Caucasian",
  "gender": "F",
  "age": 24.0,
  "location": "Beaufort/NC",
  "bbtype": "I",
  "wfreq": 2.0
}
```

And lastly, a list of all the IDs.