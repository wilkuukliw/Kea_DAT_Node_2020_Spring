$.get("videos?page=1", (response) => {   //in ajax you do not have slash    // we can access the response thru the console in webpge . all the info about video will be visible there cause this is actually ajax callback get request 
    console.log(response.response);   //for the client to request from the server .... you use ajax
    
        response.response.map((video) => {
            $("#video-gallery")
            .append(`<a href="/player/${video.fileName}">${video.title}</a>`);    // adding link to the frontpage / no hardcoding - by clicking on title 
    });
});      

