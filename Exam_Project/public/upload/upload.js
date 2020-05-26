let fileValid = false;

function validateForm() {
    const title = document.forms.photoupload.title.value;
    const description = document.forms.photoupload.description.value;
    

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


    if(mimeTypeArray[0] !== "photo") {
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

module.exports = router;