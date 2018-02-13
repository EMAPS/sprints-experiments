
years = ["1990","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"]
var data;
i=0

var year = 1996
var pyear = 0

var wholeData;
var hpad = 10;
var sc = d3.scale.linear().range([0,600])
var colors= ["#95a565",
"#8e5c64",
"#a88c57",
"#b0cfcd",
"#286275",
"#0434c",
"#efc164",
"#f3835d",
"#ff5a52",
"#aab784",
"#bb9da2",
"#cbba9a",
"#cfe2e1",
"#7ea1ac",
"#668e94",
"#f5daa2",
"#f8b59e",
"#ff9c97"
]
var col = d3.scale.ordinal().range(colors)



var svg = d3.select("#venn").append("svg").attr("width",800).attr("height",600)

d3.select("body")
    .on("keydown", function() {

    	if(d3.event.keyCode==68) {

    		updateData();

    	}

    })

d3.json("static2.json", function(d) {

  data = d;
  draw();
  draw();
})


function computeScale(){

  var max = 0;

  wholeData.forEach(function(d,i){

    var h = 0;

    d["values"]["links"].forEach(function(e,j){
      h += e.value;
    })

    h+=d["values"]["nodes"].length*hpad
    if(h>max) max = h;

  })

  sc.domain([0,max])



}

d3.json("sankey.json",function(error, rows) {
      wholeData = rows;
      console.log(wholeData)
      computeScale();
    })

function updateData() {
	console.log("hey")
	i++;
	if(i==years.length) i=0;

	draw();

	//console.log(JSON.stringify(data))
}




function draw() {

	d3.select(".year").remove();

	svg.append("text")
	.attr("class","year")
	.attr("x",20)
	.attr("y",20)
	.style("font-size",20)
	.style("font-family","lato")
	.text(years[i]);

	var pallozzi = svg.selectAll(".gr").data(data[i])

	/*var ent = pallozzi.enter()
	.append("g")
	.attr("class","gr")*/

	pallozzi
	.transition()
	.duration(500)
	.attr("cx", function(d){if ("offx" in d) return d.x+d.offx-200; else return d.x-200})
	.attr("cy", function(d){if ("offy" in d) return d.y+d.offy; else return d.y})
	.attr("r", function(d){return d.radius})

	pallozzi.enter().append("circle")
	.attr("class","gr")
	//.filter(function(d){return d.radius>0})

	.style("opacity",0.6)
	.style("fill",function(d,i){return d3.rgb(colors[i])})

	pallozzi.exit().remove();

	var txts = svg.selectAll(".txt").data(data[i])


	txts.transition().duration(500)
	.text(function(d){
		if(d.radius == 0) return "";
		else if(d.label.length>d.radius/5)
			return d.label.substring(0,d.radius/5)+"…"
		else return d.label})
	.attr("x",function(d){if ("offx" in d) return d.x+d.offx-200; else return d.x-200})
	.attr("y",function(d){if ("offy" in d) return d.y+d.offy; else return d.y})

	txts.enter().append("text")
	//.filter(function(d){return d.radius>0})

	.attr("font-family","lato")
	.attr("class","txt")
	.attr("font-size",11)
	.attr("text-anchor","middle")
	.style("fill",function(d,i){return d3.rgb(colors[i]).darker(0.7)})

	txts.exit().remove();

	pallozzi.on("click", function(d){
		console.log(d)
	})
};



$(function() {
    $( "#slider" ).slider({
        value: 0, //array index of onload selected default value on slider, for example, 45000 in same array will be selected as default on load
        min: 0, //the values will be from 0 to array length-1
        max: years.length-1, //the max length, slider will snap until this point in equal width increments
        slide: function( event, ui ) {
        	i = ui.value;
          if(i!=="1990") drawYear(years[i]);
          else d3.select("#alluvial").select("svg").remove();
        	draw();
        //$( "#amount" ).html( years[ui.value] ); //map selected "value" with lookup array
        }
    });
    //$( "#amount" ).val( "$" + years[$( "#slider" ).slider( "value")] );//map selected "value" with lookup array
});

function drawYear(y){
  year = y;
  d3.select("#alluvial").select("svg").remove();

      console.log(wholeData)

      var nodes = JSON.parse(JSON.stringify(wholeData.filter(function(e){console.log(e.year,year);return e.year === parseInt(year) } )[0]["values"]["nodes"]))
      var links = JSON.parse(JSON.stringify(wholeData.filter(function(e){return e.year === parseInt(year) } )[0]["values"]["links"]))

      var h = 0;

      links.forEach(function(d,i){
        h += d.value;
      })

      h+=nodes.length*hpad

      console.log(h)

      var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 400 - margin.left - margin.right,
    height = sc(h) - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20();

// append the svg canvas to the page
var svg = d3.select("#alluvial").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(10)
    .size([width, height]);

var path = sankey.link();

sankey
      .nodes(nodes)
      .links(links)
      .layout(32);



// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .style("fill","none")
      .style("stroke","#000")
      .sort(function(a, b) { return b.dy - a.dy; });


// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
		  return "translate(" + d.x + "," + d.y + ")"; })



// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d3.max([1,d.dy]); })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) {
		  return d.color = col(d.label.replace(/ .*/, "")); })
      .style("stroke", function(d) {
		  return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) {
		  return d.label });

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .style("font-family","Source Sans Pro")
      .style("font-size",11)
      .text(function(d) { return d.label; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");





      };
