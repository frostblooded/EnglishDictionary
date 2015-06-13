var ContainsWhitespace = function (text) {
    return text.indexOf(" ") !== -1;
}


$(document).ready( function () {
    $('form').submit( function () {
        var input_text = $(".input").val();
        
        if(ContainsWhitespace(input_text)){
            alert("One word please!");
            $(this).val(""); 
        }
        else{
            var formdata = $(this).serialize();
            $.ajax({
                type: "POST",
                url: "scripts/getWord.php",
                data: formdata,
                success: function(response){
                    $json = JSON.parse(response);

                    if($(".results").length){ //if it exists
                        $(".results").remove();
                    }

                    $container = $("<div class='results'></div>");

                    for(var i = 0; i < $json.length; i++){
                        $div = $("<div class='result'></div>");

                        $div.append("<div class='meaning'>Meaning " + (i + 1) + ":</div>");
                        $div.append("<div class='part_of_speech'>Part of speech: " + $json[i].part_of_speech + "</div>");

                        if($json[i].field != ""){
                            $div.append("<div class='field'>Field: " + $json[i].field + "</div>");
                        }

                        $div.append("<div class='definition'> Definition: " + $json[i].definition + "</div>");

                        $div.append("<br>");

                        $($container).append($div);
                    }

                    $("body").append($container);
                },
                error: function(error){
                    alert("WTF");
                }
            });
        }
        return false;
    });
});