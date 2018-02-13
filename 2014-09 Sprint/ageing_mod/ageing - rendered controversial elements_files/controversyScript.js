
$(document).ready(function(){
    
    $(".controversy_element").hover(
        function(e) {
            if($("#tooltip").length == 0) 
                getDetails($(this).attr('id'),e,0);
            else 
                $('#tooltip').remove();
        },
        function() {
            
        }
        );
    
    $('#morecontent').live('mouseover',function(e) {
        getDetails($(this).attr('eid'),e,$(this).attr('class')); // the class holds the offset
    });
    
    // find images to overlay
    $(".controversy_element > a > img").each( function (index) {
        //console.log($(this) + " " + $(this).nodeName + " " + $(this).attr('class'));
        var span = $(this).parent().parent();
    
        // in a dirty hack the controversy value is added as a class to the controversy_element
        // now we need to retrieve it
        var opacity = 0;
        var classList = span.attr('class').split(/\s+/);
        $.each( classList, function(index, item){
            if (item !== 'controversy_element') {
                //opacity = 0.5+(item/100);
                console.log(item + " " + opacity);
            }
        });
    
        // overlay image
        var pel = span.parent();
        pel.css('position','relative');
        pel.append("<div style='background-color: red; opacity:"+ opacity +"; top: 0; left:0; width:" + pel.width() + "px; height: " + pel.height() + "px; position: absolute; z-index: 100; '/>");
    });
    
    
// @todo, give element and id, on hover, ajaxretrieve the edits for the id
});

function getDetails(id,e,offset) {
    console.log(id + " " + offset);
    if($("#tooltip").length>0&&offset==0)
        return;
    
    // get url params
    
    var urlParams = {};
    (function () {
        var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) {
            return decodeURIComponent(s.replace(a, " "));
        },
        q = window.location.search.substring(1);

        while (e = r.exec(q))
            urlParams[d(e[1])] = d(e[2]);
    })();
    
    console.log(urlParams);
    // do ajax request
    $.ajax({
        url: "wikitextParser.php?eid="+id+"&language="+urlParams['language']+"&min="+urlParams['min']+"&max="+urlParams['max']+"&offset="+offset,
        cache: false
    }).done(function( html ) {
        // @todo, mouse over
        var topY = e.pageY+20;
        if(offset == 0)
            $("#content").append("<div id='tooltip' class='tooltip' style='top:"+topY+"px;'>"+html+"</div>");
        else 
            $('#morecontent').replaceWith(html);
    //console.log(html);
    });
}

