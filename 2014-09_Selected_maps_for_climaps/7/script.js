/*
 * Author Erik Borra <erik@digitalmethods.net>
 * Based on http://bost.ocks.org/mike/miserables/
 */

// initialize
var dataset = "substance_of_adaptation.json";
var orderby = "count"; // count or alphabet
var filter = ""; // only for adaptation_projects.json
d3.selectAll('.radio').on('change', function(){
    orderby = this.value;
    updateChart();
});
var whichdata = 'all';
d3.selectAll('.radiowhichdata').on('change', function(){
    whichdata = this.value;
    updateChart();
});
d3.select("#select1").style("display","block");
d3.select("#select2").style("display","block");

// init
dataset = "adaptation_projects.json";
fields = ["themes","countries","climate-hazards","key-collaborators"];
fieldNames = ["sectors","countries","climate hazards","key collaborators"];
fillOptions("#field1",fields,fieldNames,0);
fillOptions("#field2",fields,fieldNames,1);
filter = "undp";

// here the possible selections are defined
d3.select("#dataset").on("change",function(){
    var fields = [],
    fieldNames = "";
    if(this.value == "substance_of_adaptation") {
        dataset = "substance_of_adaptation.json";
        fields = ["source","recipient_mapped","year","donor","purpose","sector","sector_mapped"];
        fieldNames = ["source","country","year","donor","purpose","sector","sectors in undp alm scheme"];
        fillOptions("#field1",fields,fieldNames,0);
        fillOptions("#field2",fields,fieldNames,1);
        filter = "";
    } else if(this.value == "undp") {
        dataset = "adaptation_projects.json";
        fields = ["themes","countries","climate-hazards","key-collaborators"];
        fieldNames = ["sectors","countries","climate hazards","key collaborators"];
        fillOptions("#field1",fields,fieldNames,0);
        fillOptions("#field2",fields,fieldNames,1);
        filter = "undp";
    } else if(this.value == "psi") {
        dataset = "adaptation_projects.json";
        fields = ["themes","countries","climate-hazards","key-collaborators"];
        fieldNames = ["sectors","countries","climate hazards","key collaborators"];
        fillOptions("#field1",fields,fieldNames,0);
        fillOptions("#field2",fields,fieldNames,1);
        filter = "psi";
    } else if(this.value == "climatewise") {
        dataset = "adaptation_projects.json";
        fields = ["themes","countries","climate-hazards","key-collaborators"];
        fieldNames = ["sectors","countries","climate hazards","key collaborators"];
        fillOptions("#field1",fields,fieldNames,0);
        fillOptions("#field2",fields,fieldNames,1);
        filter = "climatewise";
    } else if(this.value == "cigrasp") {
        dataset = "cigrasp.json";
        fields = ["overview.sector","country","types","scale","overview.stimuli","overview.impacts","project_classification.project_type","project_classification.project_status","project_classification.running_time","project_classification.spatial_scale","project_classification.effect_emergence","project_classification.effect_persistence","problem_solving_capacity_an_reversibility.problem_solving_coverage","problem_solving_capacity_an_reversibility.reversibility","responsibilities.initiating_agent","responsibilities.executing_agent","responsibilities.funding_source"];
        fieldNames = ["sectors","countries","types","scale","stimuli","impacts","project type","project status","running time","spatial scale","effect emergence","effect persistence","problem solving coverage","reversibility","initiating agent","executing agent","funding source"];
        fillOptions("#field1",fields,fieldNames,0);
        fillOptions("#field2",fields,fieldNames,1);
        filter = "";
    } else if(this.value == "oecd") {
        dataset = "oecd.json";
        fields = ["SectorNameE", "sector_mapped","recipientnameE","donornameE", "agencynameE", "purposename_e", "RegionNameE", "IncomeGroupNameE"];
        fieldNames = ["sectors","sectors in undp alm scheme","recipient countries","donor countries","agency","purposes","regions","income Groups"];
        fillOptions("#field1",fields,fieldNames,0);
        fillOptions("#field2",fields,fieldNames,1);
        filter = "";
    } else if(this.value == "climatefundsupdate") {
        dataset = "climatefundsupdate.json";
        fields = ["sector","sector_mapped","recipient","recipient_income_level", "region", "donor", "implementor"];
        fieldNames = ["sectors","sectors in undp alm scheme","recipient countries", "Recipient Income Level", "Region", "Funder", "Implementor"];
        fillOptions("#field1",fields,fieldNames,0);
        fillOptions("#field2",fields,fieldNames,1);
        filter = "";
    } else if(this.value == "napa") {
        dataset = "napa.json";
        fields = ["sector","sector_mapped","recipient"];
        fieldNames = ["sectors","sectors in undp alm scheme","recipient"];
        fillOptions("#field1",fields,fieldNames,0);
        fillOptions("#field2",fields,fieldNames,1);
        filter = "";
    }
    updateChart();
//d3.select("#select1").style("display","block");
//d3.select("#select2").style("display","block");

});
d3.select("#field1").on('change',function() {
    updateChart();
});

d3.select("#field2").on('change',function() {
    updateChart();
});

updateChart();

function updateChart() {

    var source = "",
    target = "";

    source = d3.select('#field1').node().value;
    target = d3.select('#field2').node().value;


    drawChart(orderby,dataset,source,target,filter);
}

function fillOptions(fieldid, fields, fieldNames,index) {
    d3.select(fieldid).selectAll("option").remove();

    d3.select(fieldid).selectAll("option")
    .data(d3.values(fields))
    .enter()
    .append("option")
    .attr("value", function(d,i){
        return d;
    })
    .text(function(d,i){
        return fieldNames[i];
    });
}

function drawChart(orderby,dataset,source,target,filter) {
    //console.log(orderby + " " + dataset + " " + source + " " + target);
    d3.select("svg").remove();
    var margin = {
        top: 140,
        right: 100,
        bottom: 10,
        left: 250
    },
    width = 820,
    height = 2000;

    var x = d3.scale.ordinal().rangeBands([0, width]);

  

    d3.json("data/"+dataset, function(datasets) {
        var nodes = [],
        links = [],
        sources = [],
        targets = [];

        console.log("lol",source,target, datasets)

        datasets.forEach(function(d,i) {



            if(filter != "" && d.source != filter) {

                return;
              }

            if(source.indexOf(".")==-1)
                var dsources = d[source];
            else
                var dsources = eval("d."+source);
            if(target.indexOf(".")==-1)
                var dtargets = d[target];
            else
                var dtargets = eval("d."+target);
            if(dsources === "" || dtargets === "") {

                return;
              }



            if(!(dsources instanceof Array)) {

                if(dataset == "cigrasp.json")
                    dsources = dsources.split(",");
                else
                    dsources = [dsources];
            }
            if(!(dtargets instanceof Array)) {

                if(dataset == "cigrasp.json")
                    dtargets = dtargets.split(",");
                else
                    dtargets = [dtargets];
            }



            if(whichdata == 'indiabangladesh') {
                if('countries' in d && !(d.countries =='Bangladesh'||d.countries =='India'))
                    return;
                if('country' in d && !(d.country =='Bangladesh'||d.country =='India'))
                    return;
                if('recipientnameE' in d && !(d.recipientnameE =='Bangladesh'||d.recipientnameE =='India'))
                    return;
                if('recipient' in d && !(d.recipient =='Bangladesh'||d.recipient =='India'))
                    return;
                if('recipientMapped' in d && !(d.recipientMapped =='Bangladesh'||d.recipientMapped =='India'))
                    return;
            }

            dsources.forEach(function(s) {
                s = s.trim();
                if(s != 'Non-specific') {

                    var sid = nodeIndex(s,sources);
                    if(sid < 0) {
                        sources.push({
                            "name":s
                        });
                        sid = nodeIndex(s,sources);
                    }

                    dtargets.forEach(function(t) {
                        t = t.trim();
                        if(t != 'Non-specific') {
                            var tid = nodeIndex(t,targets);
                            if(tid < 0) {
                                targets.push({
                                    "name":t
                                });
                                tid = nodeIndex(t,targets);
                            }

                            var li = linkIndex(sid, tid, links);
                            if(li < 0)
                                links.push({
                                    "source":sid,
                                    "target":tid,
                                    "value":1
                                });
                            else
                                links[li].value++;
                        }
                    });
                }
            });
        });


        var matrix = [],
        ntargets = targets.length,
        nsources = sources.length;

        // Compute index per node
        targets.forEach(function(target, i) {
            target.count = 0;
            matrix[i] = d3.range(nsources).map(function(j) {
                sources[j].count = 0;
                return {
                    x: j,
                    y: i,
                    z: 0
                };
            });
        });

        // Convert links to matrix; count character occurrences.
        var max = 0;
        links.forEach(function(link) {
            matrix[link.target][link.source].z += link.value;
            if(max<link.value)
                max = link.value;
            targets[link.target].count += link.value;
            sources[link.source].count += link.value;
        });

        var y = d3.scale.ordinal().rangeBands([0, 11*ntargets]);
        var z = d3.scale.linear().domain([0, max]);

        // Precompute the orders.
        var sourceOrders = {
            name: d3.range(nsources).sort(function(a, b) {
                return d3.ascending(sources[a].name, sources[b].name);
            }),
            count: d3.range(nsources).sort(function(a, b) {
                return d3.descending(sources[a].count, sources[b].count);
            })
        };
        var targetOrders = {
            name: d3.range(ntargets).sort(function(a, b) {
                return d3.ascending(targets[a].name, targets[b].name);
            }),
            count: d3.range(ntargets).sort(function(a, b) {
                return d3.descending(targets[a].count, targets[b].count);
            })
        };

        // The default sort order.
        if(orderby == "count") {
            x.domain(sourceOrders.count);
            y.domain(targetOrders.count);
        } else {
            x.domain(sourceOrders.name);
            y.domain(targetOrders.name);
        }


        height = ntargets*11+20;

        var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("margin-left", -margin.left + "px")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var row = svg.selectAll(".row")
        .data(matrix)
        .enter().append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) {
            return "translate(0," + y(i)/2 + ")";
        })
        .each(row);

        //row.append("line")
        //.attr("x2", width);

        row.append("text")
        .attr("x", -6)
        .attr("y", 5) //y.rangeBand()/2)
        .attr("dy", ".12em")
        .attr("transform", function(d, i) {
            return "translate(0," + (y(i)+2)/2 + ")";
        })
        .attr("text-anchor", "end")
        .text(function(d, i) {
            if(targets[i].name.length>50) return targets[i].name.substr(0,50)+"…";
            else return targets[i].name;
        });

        var column = svg.selectAll(".column")
        .data(sources)
        .enter().append("g")
        .attr("class", "column")
        .attr("transform", function(d, i) {
            return "translate(" + x(i) + ",-10)rotate(-30)";
        });

        column.append("text")
        .attr("x", 6)
        .attr("y", 2.5) //y.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) {
            if(d.name.length>30) return d.name.substr(0,30)+"…";
            else return d.name;
        });

        function nodeIndex(name, list) {
            var i;
            for(i=0;i<list.length;i++) {
                if(list[i].name == name)
                    return i;
            }
            return -1;
        }

        function linkIndex(source, target, list) {
            var i;
            for(i=0;i<list.length;i++) {
                if(list[i].source == source && list[i].target == target)
                    return i;
            }
            return -1;
        }

        function row(row) {
            var cell = d3.select(this).selectAll(".cell")
            .data(row.filter(function(d) {
                return d.z;
            }))
            .enter().append("rect")
            .attr("class", "cell")
            .attr("x", function(d) {
                return x(d.x);
            })
            .attr("y", function(d) {
                return y(d.y)/2;
            })
            .attr("width", function(d) {
                return z(d.z) * (x.rangeBand()-5)
            })
            .attr("height", 10) //y.rangeBand()/2)
            .style("fill", function(d,i) {
                return "rgb(40, 98, 117)";
            })
            .style("opacity",0.7)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .append("svg:title")
            .text(function(d) {
                return d.z + " * (" + sources[d.x].name + " + "+targets[d.y].name+")";
            });
        }

        function mouseover(p) {
            d3.select(this).classed("mat-sel",true)
            d3.selectAll(".row text").classed("active", function(d, i) {
                return i == p.y;
            });
            d3.selectAll(".column text").classed("active", function(d, i) {
                return i == p.x;
            });
        }

        function mouseout() {
          d3.select(this).classed("mat-sel",false)
            d3.selectAll("text").classed("active", false);
        }

    });
}
