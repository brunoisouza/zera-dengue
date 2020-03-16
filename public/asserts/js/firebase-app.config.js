var firebaseConfig = {
    apiKey: "AIzaSyB-0gLHcG_vzgbOy2fPO4Tfh1BNVUXvmX4",
    authDomain: "zera-dengue.firebaseapp.com",
    databaseURL: "https://zera-dengue.firebaseio.com",
    projectId: "zera-dengue",
    storageBucket: "zera-dengue.appspot.com",
    messagingSenderId: "484798386056",
    appId: "1:484798386056:web:8479dcf129a35355c1743d",
    measurementId: "G-B58FM0YJL8"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
}