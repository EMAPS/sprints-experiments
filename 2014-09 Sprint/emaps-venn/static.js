
years = ["1990","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"]
colors = ['rgb(141,211,199)','rgb(255,255,179)','rgb(190,186,218)','rgb(251,128,114)','rgb(128,177,211)','rgb(253,180,98)','rgb(179,222,105)','rgb(252,205,229)']
var data;
i=0

var drag = d3.behavior.drag()
    .origin(function(d) {console.log(d); return {"x" : d.x,"y" : d.y}; })
    .on("drag", dragmove);


function dragmove(d) {
	//console.log(d,this)
  d3.select(this)
      .attr("transform", function(d){d.offx = d3.event.x-d.x; d.offy = d3.event.y-d.y; return "translate("+d.offx+","+d.offy+")"})//d.x = Math.max(radius, Math.min(width - radius, d3.event.x)))
	  
      //.attr("cy", d.y = Math.max(radius, Math.min(height - radius, d3.event.y)));
}


function updateData() {


	d3.select("svg").remove()
	i++;
	if(i==years.length) i=0;

	draw();

	console.log(JSON.stringify(data))

}


d3.json("static.json", function(d) {

	data = d;
	draw();
})

function draw() {

	var svg = d3.select("body").append("svg").attr("width",1170).attr("height",600)

	svg.append("text")
	.attr("x",20)
	.attr("y",20)
	.style("font-size",20)
	.text(years[i]);

	var pallozzi = svg.selectAll(".gr").data(data[i]).enter()
	.append("g")
	.attr("class","gr")

	pallozzi.append("circle")
	.filter(function(d){return d.radius>0})
	.attr("cx", function(d){return d.x})
	.attr("cy", function(d){return d.y})
	.attr("r", function(d){return d.radius})
	.style("opacity",0.6)
	.style("fill",function(d,i){return d3.rgb(colors[i]).darker(0.4)})

	pallozzi.append("text")
	.filter(function(d){return d.radius>0})
	.text(function(d){

		if(d.label.length>d.radius/5)
			return d.label.substring(0,d.radius/5)+"…"
		else return d.label})
	.attr("x",function(d){return d.textCenter.x})
	.attr("y",function(d){return d.textCenter.y})
	.attr("font-family","lato")
	.attr("font-size",11)
	.attr("text-anchor","middle")
	.style("fill",function(d,i){return d3.rgb(colors[i]).darker(0.7)})


	pallozzi.on("click", function(d){
		console.log(d)
	})

	pallozzi.call(drag);

	d3.select("body")
    .on("keydown", function() {

    	if(d3.event.keyCode==68) {

    		updateData();

    	}
    	
    })

};