//Exercise 2. Cristina Urbano Navas.

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
  
