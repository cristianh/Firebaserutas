var refruta;
var str = "Norte - Sur";

/**
 * Metodo que se encarga de crear y listar todas las rutas.
 * @param paginas [cantidad de elementos inicial que se van a mostrar en la pagina].
 */
var uploaplace = function (paginas) {
    // Realizamos la peticion de la clave Rutas.
    var query = firebase.database().ref("Rutasbus/Rutas").orderByKey().limitToFirst(paginas);
    query.once("value")
        .then(function (snapshot) {
            console.log(snapshot.val());
            //Tomamos  la captura de la clave y sus hijos  y recorremos cada uno de ellos.
            snapshot.forEach(function (childSnapshot) {
                //Capturamos el Clave del index.
                var key = childSnapshot.key;
                uploainfoplace(key.replace(" ",""));
                //Capturamos el Valor  o datos de cada clave.
                var childData = childSnapshot.val();
                //Creamos dinamicamente cada panel y mostramos la ruta.
                $("#rutas").append("<div class='panel panel-default'><div class='panel-heading'>"+
                    "<div class='btn-group pull-right'><button type='button' onclick='saveconfigplace(this)' id=" + childData + " class='btn  btn-success btn-sm'>"+
                    "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span></button>"+
                    "<button  onclick='deleteplace(this)' alt='Mas informacion' type='button' id=" + childData + " class='btn  btn-danger btn-sm'>"+
                    "<span class='glyphicon glyphicon-minus' aria-hidden='true'></span></button></div>"+
                    "<h5>" + key + "</div></h5><div class='panel-body'><div class='container-fluid'><div class='col-*-12'><div class='form-inline'><div class='form-group'><form action='#'><label for='Direccion:'>Direccion: </label>"+
                    "<select id='select"+key.replace(" ","")+"' onchange='setdirection(this.id)' class='form-control'></select>"+
                    "&nbsp;&nbsp;<button type='submit'  value='ir' id='"+key.replace(" ","")+
                    "' onclick='changedirection(this.id)' class='btn btn-success'>Ir</button>" +
                    "</form></div></div><div></div></div></div></div></div>");
            });
        });
}


/**
 * Metodo que se encarga de cargar las opciones de para cada ruta.
 * @param ruta [pasamos como parametro la ruta para espesificar por medio del ID a que ruta se le van a mostrar las opciones].
 */
var uploainfoplace = function (ruta) {
        var query = firebase.database().ref("Rutasbus/"+ruta).orderByKey();
        query.once("value")
            .then(function (snapshot) {
                if(snapshot.numChildren()!=0) {
                    refruta=ruta;
                    uploadopcionsmenu(refruta);
                    snapshot.forEach(function (childSnapshot) {
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();
                        //cargamos en el select las opciones de cada ruta.
                        console.log(key);
                        if(key !== "Mapas"){
                            $('#select' + refruta).append("<option>" + key + "</option>");
                        }
                    });
                }
            });
}



var query;
var uploadopcionsmenu= function(ruta){
    var objetos;
    var barrios;
    var calles;
    var carreras;
    var zonas;
    var direction;
    if(str=="Norte - Sur"){
        direction=ruta+"/Norte - Sur";
        $("#Info"+ruta).remove();
        console.log("direction",direction);
        str="";
    }
    else {
        direction=ruta+"/Sur - Norte";

        $("#Info"+ruta).remove();
        console.log("direction",direction);
        str="";
    }
    query=firebase.database().ref("Rutasbus").child(direction);
    query.once("value")
        .then(function (snapshot) {
            if(snapshot.numChildren()!=0) {
                createMenu(ruta);
                snapshot.forEach(function (childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;

                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val();
                    firebase.database().ref("Rutasbus/"+direction+"/"+key).orderByKey().once("value").then(function (snapshot) {

                        switch (snapshot.key){
                            case 'Barrios':
                                barrios = snapshot.val();
                                var nombreBarrio;
                                jQuery.each(barrios, function (item, key) {
                                    firebase.database().ref(key).orderByKey().once("value").then(function (snapshot) {
                                        nombreBarrio = snapshot;
                                        $("#menu1 h5").append("<li class='list-group-item'>" + MaysPrimera(String(nombreBarrio.val().Nombre).toLocaleLowerCase()) + "</li>");
                                    })
                                });
                                break;
                            case 'Calles':
                                calles = snapshot.val();

                                jQuery.each(calles, function (item, key) {
                                    firebase.database().ref(key).orderByKey().once("value").then(function (snapshot) {
                                        nombrelugares = snapshot;

                                        $("#menu3 h5").append("<li class='list-group-item'>" + MaysPrimera(String(nombrelugares.key).toLocaleLowerCase()) + "</li>");
                                    })
                                });
                                break;
                            case 'Carreras':
                                carreras = snapshot.val();

                                jQuery.each(carreras, function (item, key) {
                                    firebase.database().ref(key).orderByKey().once("value").then(function (snapshot) {
                                        nombrelugares = snapshot;

                                        $("#menu4 h5").append("<li class='list-group-item'>" + MaysPrimera(String(nombrelugares.key).toLocaleLowerCase()) + "</li>");
                                    })
                                });
                                break;
                            case 'Zonas':
                                zonas = snapshot.val();

                                jQuery.each(zonas, function (item, key) {
                                    firebase.database().ref(key).orderByKey().once("value").then(function (snapshot) {
                                        nombrelugares = snapshot;

                                        $("#menu2 h5").append("<li class='list-group-item'>" + MaysPrimera(String(nombrelugares.val()).toLocaleLowerCase()) + "</li>");
                                    })

                                });
                                break;
                        }
                    })
                });
            }
        });
}



var  MaysPrimera= function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var createMenu= function(refruta){
    $("<div class='row'><div class='col-lg-12 col-md-6'><div  style='margin-top: 20px' id="+"Info"+refruta+" class='col-*-12'><div class='well'> " +
        "<ul class='nav nav-tabs nav-justified'>" +
        "<li role='presentation' class='active'><a data-toggle='tab' href='#menu1'>Barrios</a></li>" +
        "<li role='presentation'><a  data-toggle='tab' href='#menu2'>Lugares</a></li>" +
        "<li role='presentation'><a  data-toggle='tab'href='#menu3'>Calles</a></li>" +
        "<li role='presentation'><a  data-toggle='tab'href='#menu4'>Carreras</a></li>" +
        "</ul>" +
        "<div class='tab-content'>" +
        "<div id='menu1' class='tab-pane fade in active'>" +
        "<h5></h5>" +
        "<p></p>" +
        "</div>" +
        "<div id='menu2' class='tab-pane fade'>" +
        "<h5></h5>" +
        "<p></p>" +
        "</div>" +
        "<div id='menu3' class='tab-pane fade'>" +
        "<h5></h5>" +
        "<p></p>" +
        "</div>" +
        "<div id='menu4' class='tab-pane fade'>" +
        "<h5></h5>" +
        "<p></p>" +
        "</div></div></div></div></div></div>").insertAfter('#' + refruta);
}


var setdirection=function (e) {
    var ruta=e;
    str="";
    str=$('#select' + refruta+"option:selected" ).text();
    console.log(str);
}

var setPlaceMaps=function (e) {
    var Mapsref=e;
    console.log(str);
    str=$("#MapsPlace  option:selected");
    console.log(str.val());
    firebase.database().ref("Rutasbus/"+refruta).child("Mapas").orderByKey().once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if(childSnapshot.key == str.val()){
                $('#framemap').attr('src',childSnapshot.val());
            }
        });

    });

}


var changedirection = function (e) {
    var ruta=e;
    uploadopcionsmenu(ruta);
}

$('form').submit(function(e){
    e.preventDefault();
    return false;
})

var saveconfigplace = function (e) {
    var user = firebase.auth().currentUser;
    if (!usuario != null) {
        var id = $(e).attr('id');
        firebase.database().ref('rutasusuario/' + user.uid + '/miruta').push({
            id: id
        }).then(function(){
            testplace();
        });
    } else {
        // No user is signed in.
    }
}

var deleteplace = function (e) {
    var key;
    var objeto = e;
    var user = firebase.auth().currentUser;
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

                    if (childData.id == id) {
                        firebase.database().ref('rutasusuario/' + user.uid + '/miruta').child(key).remove();
                        testplace();
                        /*firebase.database().ref().remove().then(function () {
                            console.log("ruta eliminada");
                        });*/
                    }


                });
            });
        //$(e).remove();

    } else {
        // No user is signed in.
    }
}
