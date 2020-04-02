let fileValid = false;

function validateForm() {
    const title = document.forms.videoupload.title.value;
    const description = document.forms.videoupload.description.value;
    const category = document.forms.videoupload.category.value;
    const tags = document.forms.videoupload.tags.value;

    if (title.length < 8 || title.length > 64) {
        return false;
    }

    if(decription.length > 2048){
        return false;
    }
    return true && fileValid;;
}


function handleFileUpload(files){
    const file = files[0];

    const mimeTypeArray = file.type.split("/");


    if(mimeTypeArray[0] !== "video") {
        fileValid = false;
        return;
    }

    const fileSize = file.size;

    const twoGBFileLimit = 2147483648;
    
    if(fileSize > twoGBFileLimit) {
        fileValid = false;
        return;
    }
    fileValid = true;
}