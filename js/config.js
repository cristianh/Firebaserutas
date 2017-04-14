var config = function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA1i40SugljILY-rBsX0kr0k222NL4KV1c",
        authDomain: "formauth-5e9bb.firebaseapp.com",
        databaseURL: "https://formauth-5e9bb.firebaseio.com",
        storageBucket: "formauth-5e9bb.appspot.com",
        messagingSenderId: "315881768661"
    };
    ref = firebase.initializeApp(config);
}

var testplace = function () {
    var commentsRef = firebase.database().ref('rutasusuario');
    commentsRef.on('child_added', function (data) {
        messajepush("Actualizacion",data.val().id);
        //console.log("Se a añadido la siguiente ruta", data.key, data.val(), data.val().id);
        firebase.database().ref('rutasusuario/' + data.key + '/miruta').once('value').then(function (snapshot) {
            var username = snapshot.val();
            console.log(username);
            // ...
        });
    });

    commentsRef.on('child_changed', function (data) {
        console.log("la siguiente ruta a cambiado", data.key, data.val(), data.val().id);
    });

    commentsRef.on('child_removed', function (data) {
        console.log("Se a eliminado la siguiente ruta", data.key, data.val(), data.val().id);
    });
}

var testusers = function () {
    var commentsRef = firebase.database().ref('users');
    commentsRef.on('child_added', function (data) {
        console.log(data.key, data.val());
    });

    commentsRef.on('child_changed', function (data) {
        console.log(data.key, data.val(), data.val());
    });

    commentsRef.on('child_removed', function (data) {
        console.log(data.key, data.val());
    });
}
