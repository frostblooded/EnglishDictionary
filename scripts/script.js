var Shhhhh = function(input){
       return input.toLocaleLowerCase() === "kawaii";
}

var ContainsWhitespace = function (text) {
    return text.indexOf(" ") !== -1;
}

var ShowError = function(error_message){
    ClearArea();
    
    $error = $("<div class='error'>" + error_message + "</div>");
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
        var input_text = $(".input").val();
        
        if(Shhhhh(input_text)){
            ClearArea();
            $(".results").append("<img src='styles/secret.gif' alt='This will display an animated GIF' class='secret'/>").css("backround-image", "url(styles/secret.gif)");
        }
        else{
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

                            $result = $("<div class='result'></div>");

                            for(var i = 0; i < $json.length; i++){
                                $result = $("<div class='result'></div>");
                                $result.append("<div class='meaning'><span class='meaning_text'>Meaning</span> " + (i + 1) + ":</div>");
                                $result.append("<div class='part_of_speech'><span class='part_of_speech_text'>Part of speech</span>: " + $json[i].part_of_speech + "</div>");

                                if($json[i].field != ""){
                                    $result.append("<div class='field'><span class='field_text'>Field</span>: " + $json[i].field + "</div>");
                                }

                                $result.append("<div class='definition'><span class='definition_text'>Definition</span>: " + $json[i].definition + "</div>");

                                $(".results").append($result);
                            }
                        }
                        catch(error){
                            ShowError("The entered input is invalid or the word doesn't exist in our database!");
                        }
                    },
                    error: function(error){
                        ShowError("The page is not connected to the server!");
                    }
                });
            }
        }
        
        return false;
    });
});