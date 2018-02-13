
years = ["1990","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"]
colors = ['rgb(141,211,199)','rgb(255,255,179)','rgb(190,186,218)','rgb(251,128,114)','rgb(128,177,211)','rgb(253,180,98)','rgb(179,222,105)','rgb(252,205,229)']
var data;
i=0


var svg = d3.select("body").append("svg").attr("width",1170).attr("height",600)

d3.select("body")
    .on("keydown", function() {

    	if(d3.event.keyCode==68) {

    		updateData();

    	}
    	
    })


function updateData() {
	console.log("hey")
	i++;
	if(i==years.length) i=0;

	draw();

	//console.log(JSON.stringify(data))
}


d3.json("static2.json", function(d) {

	data = d;
	draw();
	draw();
})

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
	.attr("cx", function(d){if ("offx" in d) return d.x+d.offx; else return d.x})
	.attr("cy", function(d){if ("offy" in d) return d.y+d.offy; else return d.y})
	.attr("r", function(d){return d.radius})

	pallozzi.enter().append("circle")
	.attr("class","gr")
	//.filter(function(d){return d.radius>0})
	
	.style("opacity",0.6)
	.style("fill",function(d,i){return d3.rgb(colors[i]).darker(0.4)})

	pallozzi.exit().remove();

	var txts = svg.selectAll(".txt").data(data[i])


	txts.transition().duration(500)
	.text(function(d){
		if(d.radius == 0) return "";
		else if(d.label.length>d.radius/5)
			return d.label.substring(0,d.radius/5)+"…"
		else return d.label})
	.attr("x",function(d){if ("offx" in d) return d.x+d.offx; else return d.x})
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
        	draw();
        //$( "#amount" ).html( years[ui.value] ); //map selected "value" with lookup array
        }
    });
    //$( "#amount" ).val( "$" + years[$( "#slider" ).slider( "value")] );//map selected "value" with lookup array
});