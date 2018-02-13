domino.settings({
    shortcutPrefix: "::" // Hack: preventing a bug related to a port in a URL for Ajax
    ,verbose: true
})

;(function($, domino, undefined){
    var D = new domino({
        name: "main"
        ,properties: [
            {
                id:'table'
                ,dispatch: 'table_updated'
                ,triggers: 'update_table'
            },{
                id:'names'
                ,dispatch: 'names_updated'
                ,triggers: 'update_names'
            }
        ],services: [
            {
                id: 'getTable'
                ,url: 'data/trajectories.csv'
                ,dataType:'string'
                ,setter: 'table'
            }
        ],hacks:[
            {
                // Events that need to be declared somewhere
                triggers: [
                        'ui_updateSettings'
                    ]
            },{
                // Init: load the table
                triggers: ['init']
                ,method: function(e){
                    this.request('getTable')
                }
            },{
                // When the table is loaded, build the names data (index the participations)
                triggers: ['table_updated']
                ,method: function(e){
                    var table = this.get('table')
                        ,rows = d3.csv.parseRows(table)
                        ,headrow = rows.shift()
                        ,names = {}

                    // Init names
                    rows.forEach(function(row){
                        names[row[0]] = {id:row[0], participations:[],}
                    })

                    // Fill participations
                    rows.forEach(function(row){
                        var name = row[0]
                        names[name].participations.push({
                            year:row[1]
                            ,arena:row[2]
                            ,event:row[2]
                            ,title:row[8]
                            ,person:name
                        })
                    })

                    // Index arenas and years
                    for(name in names){
                        var n = names[name]
                        n.years = {}
                        n.arenas = {}

                        // Init
                        n.participations.forEach(function(p){
                            n.years[p.year] = {id:p.year, arenas:[]}
                            n.arenas[p.arena] = {id:p.arena, years:[]}
                        })
                        
                        // Fill
                        n.participations.forEach(function(p){
                            n.years[p.year].arenas.push(p.arena)
                            n.arenas[p.arena].years.push(p.year)
                        })
                    }

                    this.update('names', names)
                }
            }
        ]
    })
    

    //// On load
    $( document ).ready(function() {
        D.dispatchEvent('init')
    })

    //// Modules
    // Settings
    D.addModule(function(){
        domino.module.call(this)
        
        var _self = this

        this.triggers.events['names_updated'] = function(provider, e){
            var names = provider.get('names')
                ,namesValues = d3.values(names).sort(function(a,b){return b.participations.length - a.participations.length})
            namesValues.forEach(function(n){
                $('#selector_persons').append(
                        $('<option value="'+n.id+'"></option>').text(n.id+' - '+n.participations.length+' participations')
                    )
            })
        }

        var change = function(){
                _self.dispatchEvent('ui_updateSettings')
            }

        $('.radio input[name=optionsRadios]').change(change)
        $('#selector_persons').change(change)
    })

    // Draw the diagram
    D.addModule(function(){
        domino.module.call(this)

        var buildAndShow = function(provider){
            $('#chart').svg('destroy')
            $('#chart').html('')

            var names = provider.get('names')
                ,width = $('#chart').width()
                ,height = $('#chart').height()
                ,margins = {l:20, r:150, b:80, t:20}

            $('#chart').svg({onLoad: draw})
            
            function draw(svg) {

                // Get min and max years
                var minYear = 10000
                    ,maxYear = 0
                for(name in names){
                    var n = names[name]
                    n.participations.forEach(function(p){
                        if(p.year < minYear)
                            minYear = p.year
                        if(p.year > maxYear)
                            maxYear = p.year
                    })
                }

                // Get index of arenas
                var arenas = {}
                for(name in names){
                    var n = names[name]

                    // Init
                    n.participations.forEach(function(p){
                        arenas[p.arena] = {id:p.arena, participations:[]}
                    })
                }
                for(name in names){
                    var n = names[name]
                    // Fill
                    n.participations.forEach(function(p){
                        arenas[p.arena].participations.push(p)
                    })
                }

                // Get index of years
                var years = {}
                for(name in names){
                    var n = names[name]
                    // Init
                    n.participations.forEach(function(p){
                        years[p.year] = {id:p.year, participations:[]}
                    })
                }
                for(name in names){
                    var n = names[name]
                    // Fill
                    n.participations.forEach(function(p){
                        years[p.year].participations.push(p)
                    })
                }

                // SVG
                // svg.rect(0, 0, width, height, {fill: 'yellow', stroke: 'blue', strokeWidth: 1});
                var g_y = svg.group()
                var g_a = svg.group()
                var g = svg.group()

                var years_x = {}
                for(year in years){
                    var x = Math.round(
                                margins.l + (width - (margins.l+margins.r)) * (year-minYear)/(maxYear-minYear)
                            )
                    years_x[year] = x
                    var vline_coord = {
                        x: x
                        ,y1: margins.t
                        ,y2: height - margins.b
                    }

                    svg.line(g_y, vline_coord.x, vline_coord.y1, vline_coord.x, vline_coord.y2, {strokeWidth: 0.3, stroke:'#999'})
                    svg.text(g_y, vline_coord.x-3, vline_coord.y2+20, year, {fontFamily: 'PT+Sans', fontSize: '12', fill:'black'})
                }

                var arenas_count = d3.values(arenas).length
                    ,a_index = 0

                var arenas_ordered = [
                    'IPCC'
                    ,'Cop Side Event'
                    ,'Adaption Committee'
                    ,'LEG'
                    ,'Officer of the COP'
                    ,'Consultative group of experts'
                    ,'SBI'
                    ,'SBSTA'
                ]
                var arenas_y = {}
                for(arena_rank in arenas_ordered){
                    var arena = arenas_ordered[arena_rank]
                    var y = Math.round(margins.t + (height-(margins.t+margins.b))*(a_index)/(arenas_count-1))
                    arenas_y[arena] = y
                    var hline_coord={x1:margins.l, x2:width-margins.r, y:y}
                    svg.line(g_a, hline_coord.x1, hline_coord.y, hline_coord.x2, hline_coord.y, {strokeWidth: 0.3, stroke:'#999'})
                    svg.text(g_y, hline_coord.x2+3, hline_coord.y+4, arena, {fontFamily: 'PT+Sans', fontSize: '12', fill:'black'})

                    a_index++
                }

                var namesValues = d3.values(names)
                // Filter the names if needed
                if($('#mode_sideevent').is(':checked')){
                    namesValues = namesValues.filter(function(n){
                        return n.participations.some(function(p){
                            return p.arena == 'Cop Side Event'
                        })
                    })
                } else if($('#mode_nosideevent').is(':checked')){
                    namesValues = namesValues.filter(function(n){
                        return n.participations.every(function(p){
                            return p.arena != 'Cop Side Event'
                        })
                    })
                } else if($('#mode_person').is(':checked')){
                    var person = $('#selector_persons').val()
                    namesValues = namesValues.filter(function(n){
                        return n.id == person
                    })
                }

                // Crunch the participations so that, when a person is in different arenas the same year, there are links from / to all these arenas.
                // Init
                var participationPairs = {}
                d3.keys(arenas).forEach(function(a){
                    d3.keys(years).forEach(function(y){
                        d3.keys(arenas).forEach(function(a2){
                            d3.keys(years).forEach(function(y2){
                                var id = a+'-'+y+'|'+a2+'-'+y2
                                participationPairs[id] = {id:id, count:0, sourceYear:y, targetYear:y2, sourceArena:a, targetArena:a2}
                            })
                        })

                    })
                })
                // Fill
                namesValues.forEach(function(n){
                    if(n.participations.length > 1){
                        var previousArenas = []
                        for(year in n.years){
                            var y = n.years[year]
                                ,currentArenas = y.arenas
                            if(previousArenas.length>0 && currentArenas.length>0){
                                currentArenas.forEach(function(ca){
                                    previousArenas.forEach(function(pa){
                                        var ppid = pa+'-'+(year-1)+'|'+ca+'-'+(year)
                                        participationPairs[ppid].count++
                                    })
                                })
                            }
                            previousArenas = currentArenas.slice(0)
                        }
                        
                    }
                })


                var threshold = ($('#mode_filtered').is(':checked'))?(3):(0)
                for(ppid in participationPairs){
                    var participationPair = participationPairs[ppid]
                    if(participationPair.count > threshold){
                        
                        var thickness = participationPair.count / 2
                        var style = style = {strokeWidth: thickness, stroke:'#AAF', opacity: 0.3}
                        if(arenas_y[participationPair.sourceArena] > arenas_y[participationPair.targetArena]) {
                            style = {strokeWidth: thickness, stroke:'#093', opacity: 0.6}
                        } else if(arenas_y[participationPair.sourceArena] < arenas_y[participationPair.targetArena]){
                            style = {strokeWidth: thickness, stroke:'#F00', opacity: 0.6}
                        }
                        
                        if($('#mode_person').is(':checked')){
                            style = {strokeWidth: 2, stroke:'#333', opacity: 0.6}
                        }

                        svg.line(g,
                            years_x[participationPair.sourceYear]
                            ,arenas_y[participationPair.sourceArena]
                            ,years_x[participationPair.targetYear]
                            ,arenas_y[participationPair.targetArena]
                            ,style
                        )
                    }
                }

                // Report
                var text = ''

                text += 'About trajectories'
                text += '\n-------------------------------------------------------------'
                text += '\n'
                text += '\n:: Stats'
                text += '\n'+d3.keys(names).length+' Persons'
                text += '\n'+d3.keys(arenas).length+' Arenas'
                text += '\n'+d3.keys(years).length+' Years, from '+minYear+' to '+maxYear+' included (not all year necessary represented)'
                text += '\n'
                text += '\n:: Arenas (CSV)'
                text += '\nname, participations'
                for(a in arenas){
                    var arena = arenas[a]
                    text += '\n'+arena.id+', '+arena.participations.length
                }
                text += '\n'
                text += '\n:: Persons with the most participations (Top 10)'
                var names_p = d3.values(names).sort(function(a,b){return b.participations.length - a.participations.length})
                names_p.forEach(function(n,i){
                    if(i<10){
                        text += '\n'+n.id+', '+n.participations.length+' participations'
                    }
                })
                text += '\n'
                text += '\n:: Persons with the most varied arenas (Top 10)'
                var names_a = d3.values(names).sort(function(a,b){return d3.values(b.arenas).length - d3.values(a.arenas).length})
                names_a.forEach(function(n,i){
                    if(i<10){
                        text += '\n'+n.id+', '+d3.values(n.arenas).length+' arenas'
                    }
                })
                $('#report .reportText').text(text)

            }
        }

        this.triggers.events['names_updated'] = buildAndShow
        this.triggers.events['ui_updateSettings'] = buildAndShow
        

    })

    //// Data processing

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


