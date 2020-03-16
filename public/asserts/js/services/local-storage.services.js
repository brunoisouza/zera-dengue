function getUserLocalStorage() {
    return JSON.parse(localStorage.getItem("user"));
}

function setUserLocalStorage(userJson) {
    var user = JSON.stringify(userJson.user);
    localStorage.setItem("user", user);
}

function removeUserLocalStorage() {
    localStorage.removeItem("user");
}
