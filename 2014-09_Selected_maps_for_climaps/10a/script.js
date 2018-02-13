// Barchart
// var rects = d3.select("#interactive").selectAll("rect")

// rects.on("mouseover", function(){
// 	var title = d3.select(this).select("title").text()
// 	d3.select("#value").text(title)
// })


//DNA
// var rects = d3.select("#Layer_2").selectAll("rect")

// rects.on("mouseover", function(){
// 	var title = d3.select(this).select("title").text()
// 	d3.select("#value").text(title)
// 	rects.transition().duration(200).attr("opacity", function(){
// 		var title2 = d3.select(this).select("title").text()
// 		if(title == title2){
// 			return 1 
// 		}else{
// 			return 0.3
// 		}
// 	})
// })

// rects.on("mouseout", function(){
// 	rects.transition().duration(200).attr("opacity", function(){
// 			return 1
// 	})
// })


//stream 10a
var streamPath = d3.select("#interactive").selectAll("path")

var streamGroup = d3.select("#interactive").selectAll("g")


streamPath.on("mouseover", function(){

	var parent = d3.select(this).node().parentNode

	var id = d3.select(parent).attr("id")

	streamGroup.transition().duration(200).attr("opacity", function(){
		var id2 = d3.select(this).attr("id")
		if (id2){
			if(id == id2){
				return 1 
			}else{
				return 0.3
			}
		}
	})
})

streamPath.on("mouseout", function(){
	streamGroup.transition().duration(200).attr("opacity", function(){
			var id2 = d3.select(this).attr("id")
			if(id2){
				return 1
			}
	})
})

//stream 30a/30b
// var streamPath = d3.select("#interactive").selectAll("path")
// var streamText = d3.select("#interactive").selectAll("text")

// var streamGroup = d3.select("#interactive").selectAll("g")


// streamPath.on("mouseover", function(){

// 	var parent = d3.select(this).node().parentNode

// 	parent = d3.select(parent).node().parentNode

// 	var id = d3.select(parent).attr("id")

// 	streamGroup.transition().duration(200).attr("opacity", function(){
// 		var id2 = d3.select(this).attr("id")
// 		if (id2){
// 			if(id == id2){
// 				return 1 
// 			}else{
// 				return 0.2
// 			}
// 		}
// 	})
// })

// streamPath.on("mouseout", function(){
// 	streamGroup.transition().duration(200).attr("opacity", function(){
// 			var id2 = d3.select(this).attr("id")
// 			if(id2){
// 				return 1
// 			}
// 	})
// })

// streamText.on("mouseover", function(){

// 	var parent = d3.select(this).node().parentNode

// 	parent = d3.select(parent).node().parentNode
// 	parent = d3.select(parent).node().parentNode

// 	var id = d3.select(parent).attr("id")

// 	streamGroup.transition().duration(200).attr("opacity", function(){
// 		var id2 = d3.select(this).attr("id")
// 		if (id2){
// 			if(id == id2){
// 				return 1 
// 			}else{
// 				return 0.2
// 			}
// 		}
// 	})
// })

// streamText.on("mouseout", function(){
// 	streamGroup.transition().duration(200).attr("opacity", function(){
// 			var id2 = d3.select(this).attr("id")
// 			if(id2){
// 				return 1
// 			}
// 	})
// })
