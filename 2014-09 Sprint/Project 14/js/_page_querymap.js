domino.settings({
    shortcutPrefix: "::" // Hack: preventing a bug related to a port in a URL for Ajax
    ,verbose: true
})

;(function($, domino, undefined){
    var D = new domino({
        name: "main"
        ,properties: [
            {
                id:'pendingFiles'
                ,dispatch: 'pendingFiles_updated'
                ,triggers: 'update_pendingFiles'
            },{
                id:'scores_byWeId'
                ,dispatch: 'scores_byWeId_updated'
                ,triggers: 'update_scores_byWeId'
            },{
                id:'scores_crunch'
                ,type: 'object'
                ,dispatch: 'scores_crunch_updated'
                ,triggers: 'update_scores_crunch'
            },{
                id: 'color_scale'
                ,type: 'array'
                ,value: [
                        '#ffffcc'
                        ,'#a1dab4'
                        ,'#41b6c4'
                        ,'#2c7fb8'
                        ,'#253494'
                    ]
            },{
                id:'networkLoaded'
                ,type: 'boolean'
                ,value: false
                ,dispatch: 'networkLoaded_updated'
                ,triggers: 'update_networkLoaded'
            }
        ],services: [
            {
                id: 'querySolr'
                ,dataType: 'json'
                ,url: function(input){return input.url}
                ,success: function(data, input){
                    console.log('Solr result', data)
                    var scores_byWeId = {}
                        ,resultStack = data.facet_counts.facet_fields.web_entity_id
                        ,maxCount = 0
                        ,scaleSteps = this.get('color_scale').length - 1
                        ,i
                        ,scale = []

                    while(resultStack.length > 0){
                        var weId = resultStack.shift()
                            ,count = resultStack.shift()
                        scores_byWeId[weId] = count
                        if(count>maxCount){
                            maxCount = count
                        }
                    }

                    if(maxCount > 8){
                        for(i = 1; i<=scaleSteps; i++){
                            scale.push(Math.round(Math.exp(i * Math.log(maxCount)/scaleSteps)))
                        }
                    } else {
                        scale = [1,2,4,8]
                    }
                    this.update('scores_crunch', {scale: scale, url:input.url, terms:decodeURIComponent(input.url.split('q=')[1].split('&')[0]).replace(/\+/gi, ' ').replace(/text:/gi, '')})
                    this.update('scores_byWeId', scores_byWeId)
                }
                ,error: function(data, xhr, input){
                    console.log('Solr FAIL', data, xhr, input)
                }
            }
        ],hacks:[
            {
                // Events that need to be declared somewhere
                triggers: [
                    ]
            },{
                // Init: load the network
                triggers: ['init']
                ,method: function(e){
                    this.dispatchEvent('initSigma')
                }
            },{
                // Run the query if needed
                triggers: ['ui_runQuery']
                ,method: function(e){
                    var query_simple = $('#query-input-simple').val()
                        ,query = 'http://jiminy.medialab.sciences-po.fr/solr/hyphe-emaps2/select?q='+encodeURIComponent(query_simple)+'&rows=0&fl=url+web_entity_id&wt=json&indent=true&facet=true&facet.field=web_entity_id&facet.limit=1000'
                    console.log(query)
                    this.request('querySolr', {url: query})
                }
            },{
                // When the network is loaded, notify it
                triggers: ['networkLoaded']
                ,method: function(e){
                    this.update('networkLoaded', true)
                }
            },{
                // When scores are updated, if the network is loaded, visualize scores
                triggers: ['scores_byWeId_updated']
                ,method: function(e){
                    if(this.get('networkLoaded')){
                        this.dispatchEvent('visualizeScores')
                    }
                }
            },{
                // When the network is loaded, if the scores are up to date, visualize them
                triggers: ['networkLoaded']
                ,method: function(e){
                    if(this.get('scores_crunch') && this.get('scores_crunch').scale.length > 0){
                        this.dispatchEvent('visualizeScores')
                    }
                }
            },{
                // On UI button, download CSV
                triggers: ['ui_downloadCSV']
                ,method: function(e){
                    processAndDownloadCSV(this)
                }
            }
        ]
    })
    

    //// On load
    $( document ).ready(function() {
        D.dispatchEvent('init')
    })

    //// Modules
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#sigma-main')

        this.triggers.events['networkLoaded'] = function(provider, e){
            container.find('.sigma-overlay.sigma-pending').hide()
        }
    })

    // Run query
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#run-query')

        container.click(function(){
            _self.dispatchEvent('ui_runQuery')
        })
    })

    // Sigma
    D.addModule(function(){
        domino.module.call(this)

        var _self = this

        this.triggers.events['initSigma'] = function(provider, e){
            sigma.classes.graph.addMethod('neighbors', function(nodeId) {
                var k,
                    neighbors = {},
                    index = this.allNeighborsIndex[nodeId] || {};

                for (k in index)
                    neighbors[k] = this.nodesIndex[k];

                return neighbors;
            })

            sigma.parsers.gexf('data/adaptation_web_actors_network.gexf',
                {
                  container: 'sigma-container'
                },
                function(s) {
                    s.settings({
                        drawEdges: false
                        ,minNodeSize: 0
                        ,maxNodeSize: 20
                        ,labelThreshold: 12
                    })
                    s.graph.nodes().forEach(function(n) {
                        n.color = "#999999"
                        n.originalColor = n.color
                    })
                    s.graph.edges().forEach(function(e, i) {
                        e.color = "#DDDDDD"
                        e.originalColor = e.color // From source by default
                    })

                    s.refresh()

                    // Interactions
                    s.bind('clickNode', function(e) {
                        var nodeId = e.data.node.id,
                            toKeep = s.graph.neighbors(nodeId);
                        toKeep[nodeId] = e.data.node;

                        s.graph.nodes().forEach(function(n) {
                          if (toKeep[n.id])
                            n.color = n.originalColor;
                          else
                            n.color = '#eee';
                        });

                        s.graph.edges().forEach(function(e) {
                          if (toKeep[e.source] && toKeep[e.target])
                            e.hidden = false
                          else
                            e.hidden = true
                        });

                        s.settings({
                            drawEdges: true
                        })

                        // Since the data has been modified, we need to
                        // call the refresh method to make the colors
                        // update effective.
                        s.refresh();
                    })

                    s.bind('clickStage', function(e) {
                        s.graph.nodes().forEach(function(n) {
                          n.color = n.originalColor;
                        });

                        s.graph.edges().forEach(function(e) {
                          e.color = e.originalColor;
                        });

                        s.settings({
                            drawEdges: false
                        })

                        // Same as in the previous event:
                        s.refresh();
                    });

                    _self.dispatchEvent('networkLoaded')
                }
            )
        }

        this.triggers.events['visualizeScores'] = function(provider, e){
            var color_scale = provider.get('color_scale')
                ,scores_crunch = provider.get('scores_crunch')
                ,scores_scale = scores_crunch.scale
                ,scores_byWeId = provider.get('scores_byWeId')
                ,i
                ,s = sigma.instances(0)
                ,attName = scores_crunch.terms

            s.graph.nodes().forEach(function(n){
                n.score = scores_byWeId[n.id]
                n.color = '#000000'
                if(n.score === undefined){
                    n.color = '#EEEEEE'
                    n.attributes[attName] = '-1'
                } else if(n.score == 0){
                    n.color = color_scale[0]
                    n.attributes[attName] = n.score
                } else {
                    for(i=0; i<scores_scale.length; i++){
                        if(n.score <= scores_scale[i]){
                            n.color = color_scale[i+1]
                            n.attributes[attName] = n.score
                            break;
                        }
                    }
                }
                n.originalColor = n.color
            })

            s.refresh()
        }
    })

    // Key
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#key')

        this.triggers.events['visualizeScores'] = function(provider, e){
            var color_scale = provider.get('color_scale')
                ,scores_scale = provider.get('scores_crunch').scale
                ,scores_byWeId = provider.get('scores_byWeId')
                ,appendKeyItem = function(text, color){
                        container.append(
                                $('<div style="border-top:20px solid '+color+';" class="span2"/>').text(text)
                            )
                    }
                ,i

            container.html('')

            appendKeyItem('N/A', '#EEEEEE')
            appendKeyItem('0 page', color_scale[0])
            appendKeyItem('0 to ' + scores_scale[0] + ' pages', color_scale[1])
            for(i=0; i<scores_scale.length-1; i++){
                appendKeyItem(scores_scale[i]+' to '+scores_scale[i+1] + ' pages', color_scale[i+2])
            }
        }
    })


    // Report
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#report')
            ,reportContainer = container.find('.reportText')

        this.triggers.events['networkLoaded'] = function(provider, e){
            var text = ''

            text +=   'Network loaded'
            text += '\n--------------\n'

            reportContainer.text(text)
        }


        this.triggers.events['scores_crunch_updated'] = function(provider, e){
            var text = reportContainer.text()
                ,scores_crunch = provider.get('scores_crunch')

            text += '\n'
            text += '\n:: SCORE: "' + scores_crunch.terms + '"'
            text += '\n-------------------'
            text += '\nURL used: ' + scores_crunch.url
            text += '\n'

            reportContainer.text(text)
        }
    })

    // Download CSV
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#csv_download')

        container.click(function(e){
            _self.dispatchEvent('ui_downloadCSV')
        })
    })
    

    //// Data processing
    function processAndDownloadCSV(provider){
        var csv_lines = []
            ,s = sigma.instances(0)
            ,attributes = {}
            ,hardcodedAttributes = ['id', 'label', 'x', 'y', 'size']
            ,key
            ,headline = []
            ,makeCell = function(text){
                    text = ''+text
                    return '"'+text.replace(/"/gi, '""')+'"'
                }

        // Attributes
        s.graph.nodes().forEach(function(n){
            for(key in n.attributes){
                attributes[key] = true
            }
        })

        // Headline
        hardcodedAttributes.forEach(function(att){
            headline.push(makeCell(att))
        })
        for(key in attributes){
            headline.push(makeCell(key))
        }
        console.log('headline', headline)
        csv_lines.push(headline.join(','))

        // Nodes
        s.graph.nodes().forEach(function(n){
            var line = []
            hardcodedAttributes.forEach(function(att){
                line.push(makeCell(n[att]))
            })
            for(key in attributes){
                line.push(makeCell(n.attributes[key]))
            }
            csv_lines.push(line.join(','))
        })

        // Download
        var blob = new Blob(csv_lines.map(function(l){return l + '\n'}), {'type':'application/json;charset=utf-8'})
            ,filename = "Network X Solr.csv"
        saveAs(blob, filename)
    }


})(jQuery, domino)


