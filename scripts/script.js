var input_text;

function Shhhhh(input){
       return input_text === "kawaii";
}

function ShowError(error_message){
    ClearArea();
    
    $error = $("<div class='error'>" + error_message + "</div>");
    $error.css("color", "#E3E3E3");
    $(".results").append($error);
    ResetInput();
}

function ClearArea(){
    $(".results").empty();
}

function ResetInput(){
    $input = $(".input");
    $input.val("");
    $input.focus();
}

function HandleAJAXSuccess(response){
    try{
        $json = JSON.parse(response);

        ClearArea();

        $(".results").append("<div class='searched_word'>Searched word: <span class='searched_word_text'>" + input_text.toUpperCase() + "</span></div>");

        $result = $("<div class='result'></div>");

        for(var i = 0; i < $json.length; i++){
            $result = $("<div class='result'></div>");
            $result.append("<div class='meaning'>Meaning " + (i + 1) + ":</div>");

            if($json[i].part_of_speech){
                $result.append("<div class='part_of_speech'>Part of speech: " + $json[i].part_of_speech + "</div>");
            }

            if($json[i].field){
                $result.append("<div class='field'>Field: " + $json[i].field + "</div>");
            }

            $result.append("<div class='definition'>Definition: " + $json[i].definition + "</div>");

            $(".results").append($result);
        }

        ResetInput();
    }
    catch(error){
        /* the error might say there is an unexpected token, but in truth the returned response
           is empty and thus the parsing of the json is failing */
        ShowError("The entered input is invalid or the word doesn't exist in our database!");
    }
}

function HandleAJAXError(error){
    ShowError("The page is not connected to the server!");
}

$(document).ready(function(){
    $(".input").focus();
    
    $('form').submit(function(){
        input_text = $(".input").val().toLowerCase();
        
        if(Shhhhh(input_text)){
            ClearArea();
            $(".results").append("<img src='styles/secret.gif' alt='This will display an animated GIF' class='secret'/>").css("backround-image", "url(styles/secret.gif)");
        }
        else{
            var formdata = $(this).serialize();
            
            $.ajax({
                type: "POST",
                url: "scripts/getWord.php",
                data: formdata,
                success: HandleAJAXSuccess,
                error: HandleAJAXError
            });
        }
        
        return false;
    });
});