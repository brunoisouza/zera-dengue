var storageRef = firebase.storage().ref();

function uploadImagemFocoDengue(file) {
    return uploadTask = storageRef
        .child("arquivos/" + file.name)
        .put(file);
}
