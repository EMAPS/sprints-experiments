domino.settings({
    shortcutPrefix: "::" // Hack: preventing a bug related to a port in a URL for Ajax
    ,verbose: true
})

;(function($, domino, undefined){
    var D = new domino({
        name: "main"
        ,properties: [
            {
                id:'names'
                ,dispatch: 'names_updated'
                ,triggers: 'update_names'
            },{
                id:'sankeyNetwork'
                ,dispatch: 'sankeyNetwork_updated'
                ,triggers: 'update_sankeyNetwork'
            }
        ],services: [
            {
                id: 'getNames'
                ,url: 'data/trajectories.json'
                ,setter: 'names'
            }
        ],hacks:[
            {
                // Events that need to be declared somewhere
                triggers: [
                    ]
            },{
                // Init: load the participants name
                triggers: ['init']
                ,method: function(e){
                    this.request('getNames')
                }
            },{
                // When the names are loaded, build the network
                triggers: ['names_updated']
                ,method: function(e){
                    var names = this.get('names')

                    // Get the min year and max year
                    var minYear = 10000
                        ,maxYear = 0

                    for(nameId in names){
                        var name = names[nameId]
                        name.participations.forEach(function(p){
                            if(p.year < minYear)
                                minYear = p.year
                            if(p.year > maxYear)
                                maxYear = p.year
                        })
                    }

                    // Order each participation
                    for(nameId in names){
                        var name = names[nameId]
                        name.participations.forEach(function(p){
                            p.id = p.year + "|" + p.arena
                        })
                        name.participations.sort(function(a,b){
                            return a.id > b.id
                        })
                        // Remove participation doubles
                        for(pId in name.participations){
                            var p = name.participations[pId]
                            p.keep = true
                            if(pId > 0){
                                var p_prev = name.participations[pId-1]
                                if(p.id == p_prev.id){
                                    p.keep = false
                                }
                            }
                        }
                        name.participations = name.participations.filter(function(p){return p.keep})
                    }

                    

                    // Build the participation items
                    var participations = {}
                        ,sequences = {}
                    for(nameId in names){
                        var name = names[nameId]
                            ,lastParticipationId
                        name.participations.forEach(function(p){
                            if(participations[p.id] === undefined){
                                participations[p.id] = {id:p.id, name:p.arena+' ('+p.year+')', year:p.year, arena:p.arena}
                            }
                            if(lastParticipationId){
                                if(sequences[lastParticipationId+'-'+p.id] === undefined){
                                    sequences[lastParticipationId+'-'+p.id] = {id:lastParticipationId+'-'+p.id, sourceId:lastParticipationId, targetId:p.id, count:1}
                                } else {
                                    sequences[lastParticipationId+'-'+p.id].count++
                                }
                            }
                            lastParticipationId = p.id
                        })
                    }
                    var index = {}
                        ,indexKey = 0
                    network = {
                        'nodes': d3.values(participations).map(function(p){
                                index[p.id] = indexKey++
                                return {'name': p.name, 'breadth': p.year - minYear}
                            })
                        ,'links': d3.values(sequences).map(function(s){
                                return {
                                    'source': index[s.sourceId]
                                    ,'target': index[s.targetId]
                                    ,'value':s.count
                                    ,'sourceName':participations[s.sourceId].name
                                    ,'targetName':participations[s.targetId].name
                                    ,'sourceBreadth':participations[s.sourceId].year - minYear
                                    ,'targetBreadth':participations[s.targetId].year - minYear
                                }
                            })
                    }

                    /*// Filter the network to reduce it
                    var breadthLimit = 8
                    network.links = network.links.filter(function(l){
                        return l.sourceBreadth <= breadthLimit && l.targetBreadth <= breadthLimit
                    })
                    network.nodes = network.nodes.filter(function(n){
                        return n.breadth <= breadthLimit
                    })*/
                    
                    this.dispatchEvent('update_sankeyNetwork', {
                        'sankeyNetwork': network
                    })
                }
            }
        ]
    })
    

    //// On load
    $( document ).ready(function() {
        D.dispatchEvent('init')
    })

    //// Modules
    // Draw the diagram
    D.addModule(function(){
        domino.module.call(this)

        this.triggers.events['sankeyNetwork_updated'] = buildAndShow
    })

    //// Data processing
    function buildAndShow(provider){
        $('#chart').html('')

        var network = provider.get('sankeyNetwork')

        // To Adapt
        
        var margin = {top: 1, right: 1, bottom: 6, left: 1},
            width = $('#chart').width() - margin.left - margin.right,
            height = $('#chart').height() - margin.top - margin.bottom;

        var formatNumber = d3.format(",.0f"),
            format = function(d) { return formatNumber(d) + " papers"; },
            color = d3.scale.category20();

        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var sankey = d3.sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .size([width, height]);

        var path = sankey.link();

      sankey
          .nodes(network.nodes)
          .links(network.links)
          .layout(32);

      var link = svg.append("g").selectAll(".link")
          .data(network.links)
        .enter().append("path")
          .attr("class", "link")
          .attr("d", path)
          .style("stroke-width", function(d) { return Math.max(1, d.dy); })
          .sort(function(a, b) { return b.dy - a.dy; });

      link.append("title")
          .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

      var node = svg.append("g").selectAll(".node")
          .data(network.nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .call(d3.behavior.drag()
          .origin(function(d) { return d; })
          .on("dragstart", function() { this.parentNode.appendChild(this); })
          .on("drag", dragmove));

      node.append("rect")
          .attr("height", function(d) { return d.dy; })
          .attr("width", sankey.nodeWidth())
          .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
          .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
        .append("title")
          .text(function(d) { return d.name + "\n" + format(d.value); });

      node.append("text")
          .attr("x", -6)
          .attr("y", function(d) { return d.dy / 2; })
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .attr("transform", null)
          .text(function(d) { return d.name; })
        .filter(function(d) { return d.x < width / 2; })
          .attr("x", 6 + sankey.nodeWidth())
          .attr("text-anchor", "start");

      function dragmove(d) {
        d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
        sankey.relayout();
        link.attr("d", path);
      }
      console.log('Drawing finished')
      

    }

    // Utilities
    function clean_expression(expression){
        expression = expression || "";
        return expression.replace(/ +/gi, ' ').trim().toLowerCase();
    }
    function dehydrate_expression(expression){
        expression = expression || "";
        return expression.replace(/[^a-zA-Z0-9]*/gi, '').trim().toLowerCase();
    }
    function xmlEntities(expression) {
        expression = expression || "";
        return String(expression).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

})(jQuery, domino)


