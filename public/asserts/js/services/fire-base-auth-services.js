function authUser(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email,password);
}

function authFacebook() {
    return firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
}

function authGoogle() {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function newUser(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

