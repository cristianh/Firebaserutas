var login = function (email, pass) {
    firebase.auth().signInWithEmailAndPassword(email, pass).then(function (user) {
        if(infoUser()== "ADMIN") {
            console.log("user",infoUser());
            window.location = 'bienvenida/index.html';
        }else {
            console.log("user",infoUser());
            window.location = 'control-panel.html';
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alertify.set('notifier', 'position', 'bottom-left');
        switch (errorMessage) {
            case 'The email address is badly formatted.':
                alertify.error('Error al ingresar por favor verifique su correo', 'error');
                break
            case 'The password is invalid or the user does not have a password.':
                alertify.error('Error al ingresar por favor verifique su password', 'error');
                break
            case 'The email address is already in use by another account.':
                alertify.error('Error al ingresar, Ya existe un usuario con ese correo', 'error');
                break
        }
        // ...
    });

}

//loggin google

var provider = new firebase.auth.GoogleAuthProvider();
var loginGoogle = function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        console.log(token);
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    /*firebase.auth().signInWithEmailAndPassword(email, pass).then(function (user) {
        window.location = 'bienvenida/index.html';
        //window.location.href = 'http://bienvenida/index.html?username='+snapshot.val().nombre+'&userapellido='+snapshot.val().apellido;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });*/

}

var listenerlogin = function () {
    config();
    if (userlogin()) {

        if(infoUser()== "ADMIN") {
            console.log("user",infoUser());
            window.location = 'bienvenida/index.html';
        }else {
            console.log("user",infoUser());
            window.location = 'control-panel.html';
        }
    } else {
        $("#session").click(function () {
            /*console.log("login");
              var email=$("#email").val();
               var pass=$("#pwd").val();
              login(email,pass);*/
        });
        $("#register").click(function (e) {
            viewdiv(e);
        });
        $("#login").click(function (e) {
            viewdiv(e);
        });
        $("#btngoogle").click(function (e) {
            loginGoogle();
        });
        $("#formregister").submit(function (e) {
            e.preventDefault();
            var email = $("#formregister #email").val();
            var pass = $("#formregister #pwd").val();
            createUser(email, pass);
        });
        $("#formlogin").submit(function (e) {
            e.preventDefault();
            var email = $("#email").val();
            var pass = $("#pwd").val();
            login(email, pass);
        });
        $("#Ingresar").click(function () {
            infoUser();
        });
    }
}

var loginOut = function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}