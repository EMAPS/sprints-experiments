domino.settings({
    shortcutPrefix: "::" // Hack: preventing a bug related to a port in a URL for Ajax
    ,verbose: false
})

;(function($, domino, undefined){
    var D = new domino({
        name: "main"
        ,properties: [
            {
                id: 'rowQueries'
                ,type: 'array'
                ,value: [
                        {name:'All', query:'*'}
                        ,{name:'CCVI', query:'("ccvi index" OR "index ccvi" OR "Climate Change Vulnerability Index")'}
                        ,{name:'CVM', query:'("Climate Vulnerability Monitor" OR "cvm index" OR "index cvm")'}
                        ,{name:'GAIN', query:'("Global Adaptation Index" OR "gain index" OR "index gain") AND ("climate" OR "climat" OR "clima" OR "vulnerability" OR "vulnerabilité" OR "vulnerabilite" OR "vulnerabilidad") AND ("index" OR "indice" OR "indicateur" OR "índice")'}
                        ,{name:'CRI', query:'("Global Climate Risk Index" OR ("climate risk index" AND "cri"))z'}
                        ,{name:'CCPI', query:'("Climate Change Performance Index" OR "ccpi index" OR ("ccpi" AND "performance" AND "index"))'}
                        ,{name:'DICE', query:'("DICE economic" OR "DICE model" OR "DICE économique" OR "modèle DICE" OR  "DICE económico" OR "modelo DICE")'}
                        ,{name:'HDI', query:'("Human Development Index" OR "Indice de développement humain" OR "Índice de Desarrollo Humano") '}
                        ,{name:'VASS', query:'"vulnerability assessment" OR "vulnerability index" OR "vulnerability indexes" OR "vulnerability indice" OR "vulnerability indices" OR "vulnerability monitor" OR "indice de vulnérabilité" OR "indices de vulnérabilité" OR "indice de vulnerabilite" OR "indices de vulnerabilite" OR "évaluation de la vulnérabilité" OR "evaluation de la vulnerabilite" OR "indice de la vulnerabilidad" OR "evaluacion de la vulnerabilidad"'}
                    ]
            },{
                id: 'colQueries'
                ,type: 'array'
                ,value: [
                        {name:'All', query:'*'}
                        ,{name:'CCVI', query:'("ccvi index" OR "index ccvi" OR "Climate Change Vulnerability Index")'}
                        ,{name:'CVM', query:'("Climate Vulnerability Monitor" OR "cvm index" OR "index cvm")'}
                        ,{name:'GAIN', query:'("Global Adaptation Index" OR "gain index" OR "index gain") AND ("climate" OR "climat" OR "clima" OR "vulnerability" OR "vulnerabilité" OR "vulnerabilite" OR "vulnerabilidad") AND ("index" OR "indice" OR "indicateur" OR "índice")'}
                        ,{name:'CRI', query:'("Global Climate Risk Index" OR ("climate risk index" AND "cri"))z'}
                        ,{name:'CCPI', query:'("Climate Change Performance Index" OR "ccpi index" OR ("ccpi" AND "performance" AND "index"))'}
                        ,{name:'DICE', query:'("DICE economic" OR "DICE model" OR "DICE économique" OR "modèle DICE" OR  "DICE económico" OR "modelo DICE")'}
                        ,{name:'HDI', query:'("Human Development Index" OR "Indice de développement humain" OR "Índice de Desarrollo Humano") '}
                        ,{name:'VASS', query:'"vulnerability assessment" OR "vulnerability index" OR "vulnerability indexes" OR "vulnerability indice" OR "vulnerability indices" OR "vulnerability monitor" OR "indice de vulnérabilité" OR "indices de vulnérabilité" OR "indice de vulnerabilite" OR "indices de vulnerabilite" OR "évaluation de la vulnérabilité" OR "evaluation de la vulnerabilite" OR "indice de la vulnerabilidad" OR "evaluacion de la vulnerabilidad"'}
                    ]
            }
        ],services: [
            {
                id: 'querySolr'
                ,dataType: 'json'
                ,url: function(input){return input.url}
                ,success: function(data, input){
                    // console.log('Solr result', data)
                    input.count = +data.response.numFound
                    this.dispatchEvent('queryDone', input)
                }
                ,error: function(data, xhr, input){
                    console.log('Solr FAIL', data, xhr, input)
                    input.count='FAIL'
                    this.dispatchEvent('queryDone', input)
                }
            }
        ],hacks:[
            {
                // Events that need to be declared somewhere
                triggers: [
                    ]
            },{
                // Create the table
                triggers: ['init']
                ,method: function(e){
                    
                }
            },{
                // When the table is initalized, search for a query
                triggers: ['ui_tableInitialized']
                ,method: function(e){
                    this.dispatchEvent('stackQuery')
                }
            },{
                // Stack a query when needed
                triggers: ['stackQuery']
                ,method: function(e){
                    var rows = this.get('rowQueries')
                        ,cols = this.get('colQueries')
                        ,cell ,r ,c ,query

                    // Find a cell to query
                    cell = $('td.pending')[0]
                    if(cell){
                        cell = $(cell)
                        c = +cell.attr('data-col')
                        r = +cell.attr('data-row')
                        
                        query = '('+rows[r].query+') AND ('+cols[c].query+')'

                        this.request('querySolr', {url: 'http://jiminy.medialab.sciences-po.fr/solr/hyphe-emaps2/select?q='+encodeURIComponent(query)+'&rows=0&wt=json&indent=true', r:r, c:c})
                    }
                }
            }
        ]
    })

    //// On load
    $( document ).ready(function() {
        D.dispatchEvent('init')
    })

    //// Modules


    // SVG
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#svg-container')
            ,svg
            ,visualSettings = {
                    margin: 5
                    ,firstColWidth: 80
                    ,firstRowHeight: 20
                    ,rowPadding: 2
                    ,colPadding: 1
                }

        // Display the inital table
        this.triggers.events['ui_tableInitialized'] = function(provider, e){
            var rows = provider.get('rowQueries')
                ,cols = provider.get('colQueries')

            container.svg({onLoad:init})

            function init(svgWrapper) {
                svg = svgWrapper
                visualSettings.width = container.width()
                visualSettings.height = container.height()
                initDraw()
            }

            function initDraw(){
                var g = svg.group()
                
                visualSettings.colWidth = (visualSettings.width - 2*visualSettings.margin - visualSettings.firstColWidth) / cols.length
                visualSettings.rowHeight = (visualSettings.height - 2* visualSettings.margin - visualSettings.firstRowHeight) / rows.length

                var drawColLine = function(c){
                    svg.line(
                        g
                        ,visualSettings.margin + visualSettings.firstColWidth + (c) * visualSettings.colWidth
                        ,visualSettings.margin + visualSettings.firstRowHeight
                        ,visualSettings.margin + visualSettings.firstColWidth + (c) * visualSettings.colWidth
                        ,visualSettings.height - visualSettings.margin
                        ,{stroke:"#A8A8A8", 'stroke-width':"1", 'stroke-linecap':"round", 'stroke-dasharray':"1, 4"}
                        )
                }
                var drawRowLine = function(r){
                    svg.line(
                        g
                        ,visualSettings.margin + visualSettings.firstColWidth
                        ,visualSettings.margin + visualSettings.firstRowHeight + (r) * visualSettings.rowHeight
                        ,visualSettings.width - visualSettings.margin
                        ,visualSettings.margin + visualSettings.firstRowHeight + (r) * visualSettings.rowHeight
                        ,{stroke:"#A8A8A8", 'stroke-width':"1", 'stroke-linecap':"round", 'stroke-dasharray':"1, 4"}
                        )
                }
                drawColLine(0)
                drawRowLine(0)
                drawRowLine(1)
                drawRowLine(rows.length)

                cols.forEach(function(col, c){
                    var color = (c==0)?('#A8A8A8'):('#000000')
                    svg.text(
                        g
                        ,visualSettings.margin + visualSettings.firstColWidth + (c) * visualSettings.colWidth + 0.5 * (visualSettings.colWidth)
                        ,visualSettings.margin + visualSettings.firstRowHeight - 2*visualSettings.rowPadding
                        ,col.name
                        ,{fill:color, fontSize:"10px", 'text-anchor':"middle"}
                        )
                    drawColLine(c+1)
                })

                rows.forEach(function(row, r){
                    svg.text(
                        g
                        ,visualSettings.margin
                        ,visualSettings.margin + visualSettings.firstRowHeight + r * visualSettings.rowHeight + visualSettings.rowHeight - 2*visualSettings.rowPadding - 3
                        ,row.name
                        ,{fill:"#A8A8A8", fontSize:"10px"}
                        )
                })
            }
        }

        // Update a cell
        this.triggers.events['queryDone'] = function(provider, e){
            var g = svg.group()
                ,reference = $('#id_0_'+e.data.c).attr('data-count')
                ,percentage ,cellWidth
            
            if(e.data.r == 0){
                var color = (e.data.c==0)?('#A8A8A8'):('#000000')
                svg.text(
                    g
                    ,visualSettings.margin + visualSettings.firstColWidth + (+e.data.c) * visualSettings.colWidth + 0.5 * (visualSettings.colWidth)
                    ,visualSettings.margin + visualSettings.firstRowHeight + (+e.data.r + 1) * visualSettings.rowHeight - 2*visualSettings.rowPadding - 3
                    ,e.data.count+' pages'
                    ,{fill:color, fontSize:"10px", 'text-anchor':"middle"}
                    )
            } else {
                percentage = e.data.count / reference
                cellWidth = (visualSettings.colWidth - 2*visualSettings.colPadding) * percentage
                svg.rect(
                    g
                    ,visualSettings.margin + visualSettings.firstColWidth + (+e.data.c) * visualSettings.colWidth + 0.5 * (visualSettings.colWidth) - 0.5 * cellWidth
                    ,visualSettings.margin + visualSettings.firstRowHeight + (+e.data.r) * visualSettings.rowHeight + visualSettings.colPadding
                    ,cellWidth
                    ,visualSettings.rowHeight - 2*visualSettings.colPadding
                    ,{fill: ((e.data.c==0 || e.data.c==e.data.r)?('#A8A8A8'):('#404040'))}
                    )
            }
        }
    })

    
    // Big Table
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#bigTable')

        // Display the inital table
        this.triggers.events['init'] = function(provider, e){
            var rows = provider.get('rowQueries')
                ,cols = provider.get('colQueries')

            container.append(
                    $('<tr/>').append(
                            [$('<th/>')].concat(cols.map(function(col){
                                return $('<th/>').text(col.name)
                            }))
                        )
                )
            rows.forEach(function(row, r){
                var tr = $('<tr/>').append($('<th/>').text(row.name))
                cols.forEach(function(col, c){
                    var cellId = 'id_'+r+'_'+c
                    tr.append(
                            $('<td id="'+cellId+'" class="pending" data-row="'+r+'" data-col="'+c+'"/>').html('<small class="muted">...</small>')
                        )
                })
                container.append(tr)
            })

            _self.dispatchEvent('ui_tableInitialized')
        }

        // Update a cell
        this.triggers.events['queryDone'] = function(provider, e){
            var cell = $('#id_'+e.data.r+'_'+e.data.c)
                ,reference
            cell.attr('data-count', e.data.count)

            reference = $('#id_0_'+e.data.c).attr('data-count')

            cell.removeClass('pending')
            if(e.data.count != 'FAIL')
                cell.addClass('success')
            //cell.html(e.data.count)
            cell.html(Math.round(1000 * e.data.count / reference) / 10 + ' %')
            _self.dispatchEvent('stackQuery')
        }
    })

    

    //// Data processing
    
})(jQuery, domino)

