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
                ,type: 'object'
                ,value: {}
                ,dispatch: 'names_updated'
                ,triggers: 'update_names'
            },{
                id:'namesAttributes'
                ,type:'object'
                ,value:{}
                ,dispatch: 'namesAttributes_updated'
                ,triggers: 'update_namesAttributes'
            },{
                id:'arenaFiles'
                ,value:[
                        'elected_chairs.csv'
                        ,'IPCC_authors.csv'
                        ,'COP_side_events_raw_texts.csv'
                        ,'UNFCCC_LEG.csv'
                        ,'UNFCCC_SBI.csv'
                        ,'UNFCCC_SBSTA.csv'
                    ]
            },{
                id:'arenaFilesParsed'
                ,type: 'number'
                ,value: 0
                ,dispatch: 'arenaFilesParsed_updated'
                ,triggers: 'update_arenaFilesParsed'
            },{
                id:'csv'
                ,dispatch: 'csv_updated'
                ,triggers: 'update_csv'
            }
        ],services: [
            {
                id: 'getNames'
                ,url: 'data/names.csv'
                ,dataType: 'string'
                ,success: function(data, input){
                    var lines = d3.csv.parseRows(data)
                        ,headline = lines.shift()
                        ,names = this.get('names')
                        ,namesAttributes = this.get('namesAttributes')

                    // Add names attributes
                    headline.forEach(function(colName){
                        namesAttributes[colName] = true
                    })

                    // Init names
                    lines.forEach(function(row){
                        var id = row[0].toLowerCase().trim()
                        names[id] = {participations:[]}
                    })

                    // Fill table
                    lines.forEach(function(row){
                        var id = row[0].toLowerCase().trim()
                        headline.forEach(function(colName, i){
                            names[id][colName] = row[i].trim()
                        })
                    })

                    this.update('namesAttributes', namesAttributes)
                    this.update('names', names)
                    this.dispatchEvent('names_loaded')
                }
            },{
                id: 'getArenaFile'
                ,dataType: 'string'
                ,url: function(input){return input.url}
                ,success: function(data, input){
                    var lines = d3.csv.parseRows(data)
                        ,headline = lines.shift()
                        ,names = this.get('names')
                        ,namesAttributes = this.get('namesAttributes')

                    // Find native columns
                    var textCol = -1
                        ,arenaCol = -1
                        ,yearCol = -1

                    headline.forEach(function(colName, i){
                        if(colName.toLowerCase() == 'text')
                            textCol = i
                        if(colName.toLowerCase() == 'arena')
                            arenaCol = i
                        if(colName.toLowerCase() == 'year')
                            yearCol = i
                    })


                    // Add names attributes
                    headline.forEach(function(colName, colId){
                        if(colId!=textCol && colId!=arenaCol && colId!=yearCol)
                            namesAttributes[colName] = true
                    })

                    // Update names
                    lines.forEach(function(row, rowId){
                        var text = row[textCol].toLowerCase()
                            ,year = row[yearCol]
                            ,arena = row[arenaCol]
                        // Search for a name in the text
                        // if(rowId < 3){
                            for(nameId in names){
                                if(text.indexOf(nameId) >= 0){
                                    // We found the name !
                                    var name = names[nameId]

                                    // Add participation
                                    name.participations.push({
                                        year: year
                                        ,arena: arena
                                    })
                                    // Add metadata
                                    headline.forEach(function(colName, colId){
                                        if(colId!=textCol && colId!=arenaCol && colId!=yearCol)
                                            name[colName] = row[colId]
                                    })
                                }
                            }
                        // }
                    })

                    this.update('namesAttributes', namesAttributes)
                    this.update('names', names)
                    this.update('arenaFilesParsed', this.get('arenaFilesParsed')+1)
                }
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
                // When the names file is loaded, load the arena files
                triggers: ['names_loaded']
                ,method: function(e){
                    console.log("HERE I CALL THE HACK")
                    var arenaFiles = this.get('arenaFiles')
                    
                    this.request('getArenaFile', {url: 'data/'+arenaFiles[0]})
                }
            },{
                // When Arena file has been updated, and if it needs other files, do it
                triggers:['arenaFilesParsed_updated']
                ,method: function(e){
                    var parsedFilesCount = this.get('arenaFilesParsed')
                        ,arenaFiles = this.get('arenaFiles')
                        ,arenaFilesCount = arenaFiles.length
                    if(parsedFilesCount < arenaFilesCount){
                        this.request('getArenaFile', {url: 'data/'+arenaFiles[parsedFilesCount]})
                    }
                }
            },{
                // When the last Arena file has been added, finalize
                triggers:['arenaFilesParsed_updated']
                ,method: function(e){
                    var parsedFilesCount = this.get('arenaFilesParsed')
                        ,arenaFilesCount = this.get('arenaFiles').length
                    if(parsedFilesCount == arenaFilesCount){
                        this.dispatchEvent('finalize')
                    }
                }
            },{
                // When the CSV is made, download the JSON and CSV
                triggers:['csv_updated']
                ,method: function(e){
                    var csv = this.get('csv')

                    // Download
                    var blob = new Blob([csv], {'type':'application/json;charset=utf-8'})
                        ,filename = "People and Trajectories.csv"
                    saveAs(blob, filename)

                    // Dowload JSON
                    var blob = new Blob([JSON.stringify(this.get('names'))], {'type':'application/json;charset=utf-8'})
                        ,filename = "People and Trajectories.json"
                    saveAs(blob, filename)
                }
            }
        ]
    })
    

    //// On load
    $( document ).ready(function() {
        D.dispatchEvent('init')
    })

    //// Modules

    // Report
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#report')
            ,reportContainer = container.find('.reportText')

        this.triggers.events['finalize'] = function(provider, e){
            var text = ''

            text +=   'Data crunched'
            text += '\n-------------------------------------------------------------'
            text += '\n'
            text += '\n:: Files used the treatment'
            text += '\nNames file: "names.txt"'
            text += '\nFiles for the participation: '+provider.get('arenaFiles').map(function(n){return '"'+n+'"'}).join(', ')
            
            reportContainer.text(text)
        }
    })

    // CSV
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#csv_preview')
            ,reportContainer = container.find('.reportText')

        var makeCell = function(text){
            text = ''+text
            return '"'+text.replace('"', '""')+'"'
        }

        this.triggers.events['finalize'] = function(provider, e){
            var namesAttributes = d3.keys(provider.get('namesAttributes'))
                ,csv = 'Person,Year,Arena,Name_ID,Participations Count,'+namesAttributes.map(function(d){return makeCell(d)}).join(',')
                ,names = provider.get('names')

            

            for(nameId in names){
                var name = names[nameId]
                    ,metadata = [nameId, name.participations.length]
                namesAttributes.forEach(function(attribute){
                    metadata.push(name[attribute] || '')
                })

                name.participations.forEach(function(participation){
                    csv += '\n'+makeCell(name.name)
                        +','+makeCell(participation.year)
                        +','+makeCell(participation.arena)
                        +','+metadata.map(function(d){return makeCell(d)}).join(',')
                })
            }

            reportContainer.text(csv)

            _self.dispatchEvent('update_csv', {csv: csv})
        }
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


