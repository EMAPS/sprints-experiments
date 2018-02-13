var data;
var scat;
var funds = ["Adaptation_Fund","LDC_Fund","Pilot_programme","Special_Climate_Change_Fund"]
var indexes = ["Germanwatch_inverse","Dara_inverse","Gain_inverse","Human_Development_Index"]
var selFunds = funds;



var select  = d3.select("#dropdown").append("select").on("change", change),
    options = select.selectAll('option').data(indexes); // Data join

for(var i = 0; i < funds.length; i++){
  d3.select("#checkbox")
  .append("label")
  .text(funds[i].replace(/_/g," "))
  .append("input")
  .attr("type","checkbox")
  .attr("value",funds[i])
  .attr("name",funds[i])
  .attr("checked","checked")

  .on("change",changeFunds)

}

// Enter selection
options.enter().append("option").text(function(d) { return d.replace(/_/g," ") });

function change() {

    var ind = select.property('selectedIndex')

    scat.xField(indexes[ind])
    .colorField(indexes[ind])

    var chartScat = d3.select("body")
    chartScat.datum(data).call(scat)
}

function changeFunds(){
    var type = this.value
    var check = this.checked;

    console.log(type, check)

    if(check==false) {

      var index = selFunds.indexOf(type);
      if(index>-1) selFunds.splice(index, 1);
    }
    else {

      selFunds.push(type)
    }
    console.log(selFunds)
    scat.frogeggs(selFunds)
    var chartScat = d3.select("body")
    chartScat.datum(data).call(scat)

}

d3.csv("indexes_funds.csv")
    .get(function(error, rows) {
      data = rows;

      scat = emaps.scatterplot()
                 .width(1280)
                 .height(800)
                 .sizeField("Total")
                 .xField("Germanwatch_inverse")
                 .yField("Total")
                 .frogeggs(["Adaptation_Fund","LDC_Fund","Pilot_programme","Special_Climate_Change_Fund"])
                 .labelField("Country")
                 .colorField("Germanwatch_inverse")
                 .colorArray(["#62a34e","#fbbe1a","#C03B4C"])


      var chartScat = d3.select("body")
      chartScat.datum(data).call(scat)

      });


function tryAnimation2() {

  scat.xField("Germanwatch_inverse")
  .colorField("Germanwatch_inverse")
  .frogeggs(["Adaptation_Fund","Pilot_programme","Special_Climate_Change_Fund"])


  var chartScat = d3.select("body")
  chartScat.datum(data).call(scat)



}

function tryAnimation3() {


  scat.xField("Human_Development_Index")
  .colorField("Human_Development_Index")


  var chartScat = d3.select("body")
  chartScat.datum(data).call(scat)



}
