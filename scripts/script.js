$(document).ready( function () {
    $('form').submit( function () {
        var formdata = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "scripts/getWord.php",
            data: formdata,
            success: function(response){
                $json = JSON.parse(response);

                
                for(var i = 0; i < $json.length; i++){
                    $div = $("<div class='result'></div>");
                    
                    $div.append("<div>Meaning " + (i + 1) + ":</div>");
                    
                    $div.append("<div class='part_of_speech'>Part of speech:" + $json[i].part_of_speech + "</div>");
                    
                    if($json[i].field != ""){
                        $div.append("<div class='field'>Field: " + $json[i].field + "</div>");
                    }
                    
                    $div.append("<div class='definition'> Definition: " + $json[i].definition + "</div>");
                    
                    $div.append("<br>");
                    $div.append("<br>");
                    
                    $("body").append($div);
                }
                
                
            },
            error: function(error){
            }
        });
        return false;
    });
});