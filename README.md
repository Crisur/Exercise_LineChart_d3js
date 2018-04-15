# Exercise_LineChart_d3js
# MÓDULO 7. DATA VISUALIZATION
## Cristina Urbano Navas

#### A *data.js* file is generated with the data to be displayed. This file contains the following:

```javascript
var totalGoals = [
    { year: 2003, goals: 56},
    { year: 2004, goals: 53},
    { year: 2005, goals: 61},
    { year: 2006, goals: 57},
    { year: 2007, goals: 59},
    { year: 2008, goals: 74},
    { year: 2009, goals: 68},
    { year: 2010, goals: 58},
    { year: 2011, goals: 72},
    { year: 2012, goals: 67},
    { year: 2013, goals: 82},
    { year: 2014, goals: 76},
    { year: 2015, goals: 80},
    { year: 2016, goals: 93},
    { year: 2017, goals: 85},   
    ];
  ```
### Next, the style file *styles.css* is generated, used later to generate the visualization:

```css

.dot {
    fill: hsl(249, 100%, 50%);
    stroke: #fff;
}

.axis text {
    font: 10px sans-serif;
}
  
.axis path,
.axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
}
  
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}

div.tooltip {	
    position: absolute;			
    text-align: center;			
    width: 60px;					
    height: 28px;					
    padding: 2px;				
    font: 12px sans-serif;		
    background: lightsteelblue;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
}
```

### The html page *index.html* is generated, from where the d3.min.js library will be called, along with the style, data and generation code files of the visualization.

```html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
  </body>
  <link rel="stylesheet" href="./styles.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js" charset="utf-8"></script>
  <script src="./data.js"></script>
  <script src="./main.js"></script>
</html>

```
### Finally, the file *main.js* is created, in charge of performing the visualization of the data.

```javascript

//Variables
let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; // scales

//Functions calls
setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendLineDotsCharts();


// 1. Margins 
// Let's start by selecting the SVG Node
function setupCanvasSize() {
    margin = {top: 50, right: 50, bottom: 50, left: 50}
    width = window.innerWidth - margin.left - margin.right // Use the window's width 
    height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
  
  }

function appendSvg(domElement) {
    svg = d3.select(domElement).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",`translate(${margin.left}, ${margin.top})`);
  
  }

// 2. On the X axis we want to map totalGoals values topixels
// domain == data (data from 0 to maxGoals) boundaries
function setupXScale()
{
    var maxYear = d3.max(totalGoals, function(d, i) {
        return d.year;
      });
    
      var minYear = d3.min(totalGoals, function(d, i) {
        return d.year;
      });
    
        x = d3.scaleLinear()
            .range([0, width - 100])
            .domain([minYear - 1, maxYear + 1]);
}

// 3. we don't have a linear range of values, we have a discrete
// range of values (one per year)
function setupYScale()
{
  var maxGoals = d3.max(totalGoals, function(d, i) {
    return d.goals;
  });

  var minGoals = d3.min(totalGoals, function(d, i) {
    return d.goals;
  });

    y = d3.scaleLinear()
        .range([height, 0])
        .domain([minGoals - 10, maxGoals + 10]);

}

//4. Add the X Axis
function appendXAxis() {   
    svg.append("g")
        .attr("transform",`translate(0, ${height})`)
        .call(d3.axisBottom(x));
}

//5. Add the Y Axis
function appendYAxis() {
    svg.append("g")
    .call(d3.axisLeft(y));
}

//6. Add the line with the dots
function appendLineDotsCharts() {
    // define the line
    var valueline = d3.line()
        .x(function(d) { 
            return x(d.year); 
        })
        .y(function(d) { 
            return y(d.goals); 
        });

    // Define the div for the tooltip
    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);  

    // Add the valueline path.
    svg.append("path")
        .data([totalGoals])
        .attr("class", "line")
        .attr("d", valueline);

    // Appends a circle for each datapoint 
    svg.selectAll(".dot")
        .data(totalGoals)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.year); })
        .attr("cy", function(d) { return y(d.goals); })
        .on("mouseover", function(d) {	 //Add a tooltip for each datapoint	
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Año: " + d.year + "<br/>"  + "Goles: " + d.goals)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

   
}
```
### Final result:

![alt text](https://github.com/Crisur/Exercise_LineChart_d3js/blob/master/Gr%C3%A1fica.png "Grahp")
