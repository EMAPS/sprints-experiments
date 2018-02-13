var file;

//var svg = d3.select("body").append("svg")
//.attr("width",1280)
//.attr("height",800);
var sets;
var data;
var diagram;

function play(year) {
	sets = venn.venn(data[year].sets, data[year].overlaps); 
	//diagram = venn.drawD3Diagram(d3.select(".simple_example"), sets, 1280, 400);
	//venn.drawD3Diagram(d3.select(".simple_example"), sets, 1880, 400);
	d3.selectAll("circle").style("opacity",1);
	d3.selectAll("text").style("opacity",1);

	venn.updateD3Diagram(diagram, sets);
	d3.selectAll("circle").filter(function(a){return a.radius==0}).style("opacity",0);
	d3.selectAll("text").filter(function(a){return a.radius==0}).style("opacity",0);	

	console.log(",",JSON.stringify(sets))
}

d3.json("venn2.json", function(d) {

data = d;

var k = d3.keys(data).filter(function(e){return e!=="1990" && e!=="1996" && e!=="1997" && e!=="2001"})

var s = venn.venn(data[k[0]].sets, data[k[0]].overlaps)

diagram = venn.drawD3Diagram(d3.select(".simple_example"), s, 1170, 600);

diagram.text.style("font-size", "11px")
            .style("font-weight", "400")
            .style("font-family", "Lato");


d3.selectAll("circle").filter(function(a){return a.radius==0}).style("opacity",0);
d3.selectAll("text").filter(function(a){return a.radius==0}).style("opacity",0);
/*k.forEach(function(i,e){
		console.log(i)
		play(i);
	
})*/

console.log(JSON.stringify(s))
// get positions for each set
//sets = venn.venn(data["1990"].sets, data["1990"].overlaps);

// draw the diagram in the 'simple_example' div
//venn.drawD3Diagram(d3.select(".simple_example"), sets, 1280, 800);


});



