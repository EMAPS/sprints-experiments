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
                id:'colors_byValue'
                ,type: 'object'
                ,value: {
                    'NGO': '#75CDB3'
                    ,'International institutions': '#C3D645'
                    ,'Individual': '#E68571'
                    ,'Governments': '#D891C2'
                    ,'Academic institutions': '#85AED7'
                    ,'National institutions': '#86D178'
                    ,'Media': '#D2A952'
                    , 'Other': '#DDDDDD'
                }
            }
        ],services: [
            /*{
                id: 'getNetwork'
                ,url: 'data/adaptation_actors.gexf'
                ,dataType: 'string'
                ,success: function(data, input){
                    console.log('Network fetched')
                }
                ,error: function(data, xhr, input){
                    console.log('Failed to fetch the network')
                }
            }*/
        ],hacks:[
            {
                // Events that need to be declared somewhere
                triggers: [
                    ]
            },{
                // Init: load the network
                triggers: ['init']
                ,method: function(e){
                    var colors_byValue = this.get('colors_byValue')
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
                            s.graph.nodes().forEach(function(n) {
                                var color = colors_byValue[n.attributes['user: actortype']]
                                if(color === undefined){
                                    color = colors_byValue['Other']
                                }
                                n.color = color
                                n.originalColor = n.color
                            })
                            s.graph.edges().forEach(function(e, i) {
                                e.color = "#EEEEEE"
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
                                  e.hidden = false
                                });

                                // Same as in the previous event:
                                s.refresh();
                            });

                            domino.instances('main').dispatchEvent('networkLoaded')
                        }
                    )
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
    })

    // Key
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#key')

        this.triggers.events['init'] = function(provider, e){
            var colors_byValue = provider.get('colors_byValue')
                ,appendKeyItem = function(text, color){
                        container.append(
                                $('<div style="border-top:20px solid '+color+';" class="span1 keyItem"/>').text(text)
                            )
                    }

            container.html('')

            for(text in colors_byValue){
                appendKeyItem(text, colors_byValue[text])
            }
        }
    })

    //// Data processing


})(jQuery, domino)


