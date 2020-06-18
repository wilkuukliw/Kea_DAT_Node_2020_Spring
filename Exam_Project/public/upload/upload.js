let fileValid = false;


function handleFileUpload(files) {
    const file = files[0];
    
    const mimeTypeArray = file.type.split("/");

    if (mimeTypeArray[0] !== "image") {
        fileValid = false;
        return;
    }

    const fileSize = file.size;

    const twoGBFileLimit = 2147483648;

    if (fileSize > twoGBFileLimit) {
        fileValid = false;
        return;
    }

    fileValid = true;
}