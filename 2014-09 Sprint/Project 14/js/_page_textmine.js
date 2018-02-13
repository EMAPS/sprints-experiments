domino.settings({
    shortcutPrefix: "::" // Hack: preventing a bug related to a port in a URL for Ajax
    ,verbose: true
})

;(function($, domino, undefined){
    var D = new domino({
        name: "main"
        ,properties: [
            {
                id:'expressionsIndex'
                ,type: 'object'
                ,dispatch: 'expressionsIndex_updated'
                ,triggers: 'update_expressionsIndex'
            },{
                id:'expressions'
                ,type: 'array'
                ,dispatch: 'expressions_updated'
                ,triggers: 'update_expressions'
            },{
                id:'stopWords'
                ,type: 'array'
                ,value: ["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]
            }
        ],services: [
            {
                id: 'querySolr'
                ,dataType: 'json'
                ,url: function(input){return input.url}
                ,success: function(data, input){
                    var expressionsIndex = {}
                        ,expressions = []
                        ,threshold = 10
                        ,stopWords = this.get('stopWords')
                        ,lru, expression

                    console.log('Solr result', data)

                    for(lru in data.highlighting){
                        if(data.highlighting[lru].text)
                            data.highlighting[lru].text.forEach(function(text){
                                getKeyPhrases(text, {atLeast:1, numWords:4}).forEach(function(o){
                                    expressionsIndex[o.word] = (expressionsIndex[o.word] || 0) + o.count
                                })
                            })
                    }

                    // Filter the expressions
                    for(expression in expressionsIndex){
                        var count = expressionsIndex[expression]
                        if(
                            count < threshold
                            || !expression.split(' ').some(function(w){return stopWords.indexOf(w) == -1})
                        ){
                            delete expressionsIndex[expression]
                        } else {
                            expressions.push({text:expression, count:count})
                        }
                    }
                    expressions.sort(f_sortSountDescending)

                    this.update('expressionsIndex', expressionsIndex)
                    this.update('expressions', expressions)
                    this.dispatchEvent('queryDone', {url:input.url})
                }
                ,error: function(data, xhr, input){
                    this.dispatchEvent('queryDone', {url:input.url})
                    console.log('Solr FAIL', data, xhr, input)
                }
            }
        ],hacks:[
            {
                // Events that need to be declared somewhere
                triggers: [
                    ]
            },{
                // Run the query if needed
                triggers: ['ui_runQuery']
                ,method: function(e){
                    var query_simple = $('#query-input-simple').val()
                        ,query = 'http://jiminy.medialab.sciences-po.fr/solr/hyphe-emaps2/select?q='+encodeURIComponent(query_simple)+'&rows=1000&wt=json&indent=true&fl=url&hl=true&hl.fl=text&hl.simple.pre=+&hl.simple.post=+&hl.snippets=150&hl.fragsize=500'
                    console.log(query)
                    this.request('querySolr', {url: query})
                }
            }
        ]
    })

    //// On load
    $( document ).ready(function() {
        D.dispatchEvent('init')
    })

    //// Modules

    // Run Query
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#query-ui')
        container.find('button').click(function(){
            _self.dispatchEvent('ui_runQuery')
            container.find('.input-append').hide()
            container.find('.progress').show()
        })

        this.triggers.events['queryDone'] = function(provider, e){
            container.find('.input-append').show()
            container.find('.progress').hide()
        }


    })

    // Report
    D.addModule(function(){
        domino.module.call(this)

        var _self = this
            ,container = $('#report')
            ,reportContainer = container.find('.reportText')

        this.triggers.events['queryDone'] = function(provider, e){
            var text = ''

            text +=   ':: Query'
            text += '\nurl: '+e.data.url
            text += '\n'

            reportContainer.text(text)
        }

        this.triggers.events['expressions_updated'] = function(provider, e){
            var text = reportContainer.text()
                ,expressions = provider.get('expressions')

            text +=   'Top 100 expressions:'
            expressions.forEach(function(o, i){
                if(i<100)
                    text += '\n'+o.count+','+makeCell(o.text)
            })
            text += '\n'
            text += '\n'

            reportContainer.text(text)
        }

    })

    //// Data processing
    function getKeyPhrases(text, settings){
        /*@author Rob W, created on 16-17 September 2011, on request for Stackoverflow (http://stackoverflow.com/q/7085454/938089)
         * Modified on 17 juli 2012, fixed IE bug by replacing [,] with [null]
         * This script will calculate words. For the simplicity and efficiency,
         * there's only one loop through a block of text.
         * A 100% accuracy requires much more computing power, which is usually unnecessary
         **/

        var settings = settings || {}
            ,atLeast = settings.atLeast || 2        // Show results with at least .. occurrences
            ,numWords = settings.numWords || 5      // Show statistics for one to .. words
            ,ignoreCase = true                      // Case-sensitivity
            
            // RE pattern to select valid characters. Invalid characters are replaced with a whitespace
            ,REallowedChars = /[^a-zA-Z'\-]+/g
            
            ,i, j, k, textlen, len, s
            ,output = []

        // Prepare key hash
        var keys = [null] //"keys[0] = null", a word boundary with length zero is empty
        var results = []
        numWords++ //for human logic, we start counting at 1 instead of 0
        for (i=1; i<=numWords; i++) {
            keys.push({})
        }

        // Remove all irrelevant characters
        text = text.replace(REallowedChars, " ").replace(/^\s+/,"").replace(/\s+$/,"")

        // Create a hash
        if (ignoreCase) text = text.toLowerCase()
        text = text.split(/\s+/)
        for (i=0, textlen=text.length; i<textlen; i++) {
            s = text[i]
            keys[1][s] = (keys[1][s] || 0) + 1
            for (j=2; j<=numWords; j++) {
                if(i+j <= textlen) {
                    s += " " + text[i+j-1]
                    keys[j][s] = (keys[j][s] || 0) + 1
                } else break
            }
        }

        // Prepares results for advanced analysis
        for (var k=1; k<=numWords; k++) {
            results[k] = []
            var key = keys[k]
            for (var i in key) {
                if(key[i] >= atLeast) results[k].push({"word":i, "count":key[i]})
            }
        }

        for (k=1; k<numWords; k++) {
            // results[k].sort(f_sortSountDescending) //sorts results

            output = output.concat(results[k])
        }
        output.sort(f_sortSountDescending)
        return output
    }

    function makeCell(text){
        text = ''+text
        return '"'+text.replace(/"/gi, '""')+'"'
    }

    var f_sortSountDescending = function(x,y) {return y.count - x.count}
    
})(jQuery, domino)

