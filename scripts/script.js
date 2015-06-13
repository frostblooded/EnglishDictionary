var ContainsWhitespace = function (text) {
    return text.indexOf(" ") !== -1;
}

var ShowError = function(error_message){
    ClearArea();
    
    $error = $("<div>" + error_message + "</div>");
    $error.css("color", "red");
    $(".results").append($error);
    
    $input = $(".input");
    $input.val("");
    $input.focus();
}

var ClearArea = function(){
    $(".results").empty();
}


$(document).ready( function () {
    $(".input").focus();
    
    $('form').submit( function () {
        $input = $(".input");
        var input_text = $input.val();
        
        if(ContainsWhitespace(input_text)){
            ShowError("One word please!"); 
        }
        else{
            var formdata = $(this).serialize();
            $.ajax({
                type: "POST",
                url: "scripts/getWord.php",
                data: formdata,
                success: function(response){
                    try{
                        $json = JSON.parse(response);
                        
                        ClearArea();
                        
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

                        $(".results").append($container);
                    }
                    catch(error){
                        ShowError("The entered input is invalid or the word doesn't exist in our database!");
                    }
                },
                error: function(error){
                    alert("WTF");
                }
            });
        }
        return false;
    });
});