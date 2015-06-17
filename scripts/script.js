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
    ResetInput();
}

var ClearArea = function(){
    $(".results").empty();
}

var ResetInput = function(){
    $input = $(".input");
    $input.val("");
    $input.focus();
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

                            $(".results").append("<div class='searched_word'>Searched word: <span class='searched_word_text'>" + input_text.toUpperCase() + "</span></div>");
                            
                            $result = $("<div class='result'></div>");

                            for(var i = 0; i < $json.length; i++){
                                $result = $("<div class='result'></div>");
                                $result.append("<div class='meaning'>Meaning " + (i + 1) + ":</div>");
                                $result.append("<div class='part_of_speech'>Part of speech: " + $json[i].part_of_speech + "</div>");

                                if($json[i].field != ""){
                                    $result.append("<div class='field'>Field: " + $json[i].field + "</div>");
                                }

                                $result.append("<div class='definition'>Definition: " + $json[i].definition + "</div>");

                                $(".results").append($result);
                            }
                            
                            ResetInput();
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