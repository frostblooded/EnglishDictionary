$(document).ready( function () {
    $('form').submit( function () {
        var formdata = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "scripts/getWord.php",
            data: formdata,
            success: function(response){
                $("body").append("<div>" + response + "</div>");
            },
            error: function(error){
            }
        });
        return false;
    });
});