d3.csv("matrix.csv")
    .get(function(error, rows) {
      data = rows;

      mat = emaps.matrix()
                 .width(1280)
                 .height(800)
                 .yField("item")
                 .xField(["ALL","CCVI","CVM","GAIN","CRI","CCPI","DICE","HDI","VASS"])
                 .normalization("whole")
                 .colorField(null)
                 .selColor("B0CFCD")
                 //.sortFields(["DICE"])
                 .matrixStyle("bars")
                 .colorArray("#286275")


      var chartMat = d3.select("body")
      chartMat.datum(data).call(mat)

  });

$("body").on("click",".xlabel", function(){
      var s = $(this).html()
      var cl = $(this).attr("class")
      var o = null;

      if(cl.indexOf("sort")>-1 || cl.indexOf("s-up")>-1) o = "descending"
      else if (cl.indexOf("s-down")>-1) o = "ascending"

      mat
      .sortFields([s])
      .sortOrder(o)

      var chartMat = d3.select("body")
      chartMat.datum(data).call(mat)

})
/*

      function transitionOne() {

        mat
        .sortFields(["DICE"])
        .matrixStyle("circles")


        var chartMat = d3.select("body")
        chartMat.datum(data).call(mat)


      }

      function transitionTwo() {

        mat
        .sortFields(["DICE"])
        .matrixStyle("heatmap")


        var chartMat = d3.select("body")
        chartMat.datum(data).call(mat)


      }*/
