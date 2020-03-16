var database = firebase.database();

function getDadosUsuario(userId){
    //return firebase.database().ref("/usuarios/" + userId + "/dados").once('value');
    return database.ref('usuarios/' + userId).child('dados').once('value');
}

function setDadosUsuario(userId, dadosUsuario){
    //firebase.database().ref("/usuarios/" + userId).child("dados").set(dadosUsuario);
    return database.ref('usuarios/' + userId).child('dados').set(dadosUsuario);
}

function getDadosDenuncia(userId){
    //return firebase.database().ref("/usuarios/" + userId + "/denuncias").once('value');
    return database.ref('usuarios/' + userId).child('denuncias').once('value');
}

function setDenuncia(userId, dadosDenuncia){
    //firebase.database().ref("/usuarios/" + userId).child("denuncias").set(dadosDenuncia);
    return database.ref('usuarios/' + userId).child('denuncias').set(dadosDenuncia);
}

