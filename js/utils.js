var clearform = function () {
    $("#formregister #Edad").val('');
    $("#formregister #email").val('');
    $("#formregister #Apellido").val('');
    $("#formregister #Nombre").val('');
}

var countUserRegister= function() {
    query = firebase.database().ref("users");
    query.once("value")
        .then(function (snapshot) {
            
            $(".badge").append(snapshot.numChildren());
        });

}

var countPlaceAdd= function() {
    var user = firebase.auth().currentUser;
    query = firebase.database().ref("rutasusuario/" + user.uid + "/miruta/");
    query.once("value")
        .then(function (snapshot) {
           $("#placeadd").text(snapshot.numChildren());
            $("#placeadd").attr('data-toggle','tooltip');
            $("#placeadd").attr('title','Tienes Nuevas rutas!');

        });

}


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};