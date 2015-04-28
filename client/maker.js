"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#RoomMessage").animate({width:'toggle'},350);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#RoomMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeRoomSubmit").on("click", function(e) {
        e.preventDefault();
    
        $("#RoomMessage").animate({width:'hide'},350);
    
        if($("#RoomName").val() == '' || $("#RoomAge").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }

        sendAjax($("#RoomForm").attr("action"), $("#RoomForm").serialize());
        
        return false;
    });
    
});