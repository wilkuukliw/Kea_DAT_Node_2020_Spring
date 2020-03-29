//this is a client sidee code!!

//todo: consolelog pathvariable

const fullUrl = window.location.href;
const videoId = fullUrl.substr(fullUrl.lastIndexOf("/") + 1);


// todo: Call the backend and retrieve the json about this specific video - ajax

$.get(`/videos/${videoId}`)
    .done((response) => {
        $(".title").text(response.response.title);

//Dynamically add the correct video in player.js rather than hardcoding it in player.html.    dynamically = jQuery
const player =  `<video id="player" width="320" height="240" controls> 
                <source src="/${videoId}">
                Your browser does not support the video tag.
                </video>`; 
                    
                $("#player-wrapper").append(player);
                
                $(".description").text(response.response.description);
            })
            .catch((error) => {
                console.log(error);
                $(".title").text("Could not find video");
        });