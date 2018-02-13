var data;
var scat;
var sel;
var prev;
var top5;

d3.csv("top5.csv")
.get(function(error, rows) {
  top5 = rows;
})

setInterval(changeTop, 300);


function changeTop(){

  if(prev !== sel) {
    if(sel && sel !== null) {

    var cur = top5.filter(function(d){
      return d.Donor === sel;
    })[0]

    d3.selectAll(".rec").remove();

    vals = d3.values(cur).slice(1,cur.length)
    d3.select("#top5 h2").text(cur.Donor)

    d3.select("#recipients").selectAll(".rec").data(vals)
    .enter().append("div")
    .attr("class","rec")
    .text(function(d) {return d})

    }
    else {
      console.log("null")
    }
  }

  prev = sel;

}


d3.csv("25a-data.csv")
    .get(function(error, rows) {
      data = rows;

      scat = emaps.scatterplot()
                 .width(1280)
                 .height(800)
                 .sizeField("amount")
                 .xField("purposes")
                 .yField("recipients")
                 .labelField("donor")
                 .colorField(null)
                 .colorArray(["#ddd"])

      var chartScat = d3.select("#viz")
      chartScat.datum(data).call(scat)

      });

function logSel(){
  console.log(sel)
}
