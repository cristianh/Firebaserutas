var createUser = function (email, pass) {
    var createuser = firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (user) {
        firebase.database().ref('users/' + user.uid).set({
            nombre: $("#formregister #Nombre").val(),
            apellido: $("#formregister #Apellido").val(),
            email: $("#formregister #email").val(),
            edad: $("#formregister #Edad").val()
        });
        clearform();
        alertify.set('notifier', 'position', 'bottom-left');
        alertify.success('El usuario a sido registrado', 'success');

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alertify.set('notifier', 'position', 'bottom-left');
        alertify.error('Error al registrar el usuario', 'error');
    });
}

var uploadplaceuser = function () {
    firebase.auth().onAuthStateChanged(function (user) {

        this.idf = 0;
        if (user) {
            var query = firebase.database().ref('rutasusuario/' + user.uid + '/miruta').orderByKey();
            query.once("value")
                .then(function (snapshot) {
                    if(snapshot.numChildren()!=0){
                        snapshot.forEach(function (childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;
                        // childData will be the actual contents of the child
                        var childData = childSnapshot.val();
                        var nombreruta = childData.id;
                        this.idf++;
                        $("#rutas").append("<div id=" + idf + " class='panel panel-default'>"+
                            "<div class='panel-heading'><div class='btn-group pull-right'>"+
                            "<button  onclick='deleteplaceuser(this)' alt='Mas informacion' type='button' id=" + nombreruta + " class='btn  btn-danger btn-sm'>"+
                            "<span class='glyphicon glyphicon-minus' aria-hidden='true'></span>"+
                            "</button></div><h5>" + nombreruta.substr(nombreruta.indexOf('/') + 1, nombreruta.length - 1) + "</div>"+
                            "</h5><div class='panel-body'></div></div>");
                        //console.log(childData);
                    });

                    }
                else{
                    $("#rutas").append("<h3>No tienes ninguna ruta.</h3>");
                }
                });
        } else {
            // No user is signed in.
        }
    });
}

var uploadinfouser = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        this.user = firebase.auth().currentUser;

        if (user) {

            var query = firebase.database().ref('users/' + user.uid).orderByKey();
            query.once("value")
                .then(function (snapshot) {
                    var key = snapshot.key;
                    // childData will be the actual contents of the child
                    var childData = snapshot.val();
                    var apellido = childData.apellido;
                    var nombre = childData.nombre;
                    var edad = childData.edad;
                    var email = childData.email;
                    $("#infouser").append("<div class='panel panel-default'>"+
                     "<div class='panel-heading'>"+
                        "<div class='btn-group pull-right'>"+
                    "<button  onclick='deleteplaceuser(this)' alt='Mas informacion' type='button' id=" + key + " class='btn  btn-default btn-sm'>"+
                    "Editar"+
                    "</button></div>"+
                        "<h5><b>Bienvenido:</b><b>&nbsp;" + nombre.toUpperCase() + " " +apellido.toUpperCase() + "</b></h5></div><div class='panel-body'>" +
                        "<div class='row'><div class='col-lg-6'><h5><b>Edad:</b> " + edad+"</h5></div><div class='col-lg-6'><h5><b>Correo:</b><a> " + email.toUpperCase()+"</a></h5></div></div></div>");
                    //console.log(childData);
                });
        } else {
            // No user is signed in.
        }
    });
}

var deleteplaceuser = function (e) {
    var key;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var id = $(e).attr('id');
            var query = firebase.database().ref('rutasusuario/' + user.uid + '/miruta').orderByKey();
            query.once("value")
                .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        key = childSnapshot.key;
                        // childData will be the actual contents of the child
                        var childData = childSnapshot.val();
                        console.log("chilsData:", childData.id);
                        if (childData.id == id) {
                            console.log(user.uid);
                            alertify.confirm('Eliminar ruta?', 'Seguro desea eliminar esta ruta', function () {
                                firebase.database().ref('rutasusuario/' + user.uid + '/miruta').child(key).remove().then(function () {
                                    $("#rutas").empty();
                                    uploadplaceuser();
                                });
                            }, function () {
                                //alertify.error('Cancel')
                            });

                        }
                    });
                });

            //$("#rutas").remove();
        }
    });
}

var infoUser = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            /*firebase.database().ref('users/' + user.uid).on('value', function (snapshot) {
                console.log(snapshot.val().nombre);
                console.log(snapshot.val().edad);
                $('#mensajebienvenida').append(' ' + snapshot.val().nombre);
            });*/
            return snapshot.val().nombre;
        } else {
            // No user is signed in.
        }
    });
}

var userlogin = function () {
    var user = firebase.auth().currentUser;
    if (user != null) {
        return true;
    } else {
        return false;
    }
}