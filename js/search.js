var searchplace = function () {
    this.barriosCompleto = [];
    this.query = firebase.database().ref("Barrios").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                //var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                //console.log(key);
                //console.log(childData.Nombre);
                barriosCompleto.push(childData.Nombre);

            });
        });
    $("#buscarE").autocomplete({
        source: barriosCompleto,
        minLength: 3,
        autoFocus: true,
        delay: 500,
        select: function (event, ui) {
            /*$( "#project" ).val( ui.item.label );
            $( "#project-id" ).val( ui.item.value );
            $( "#project-description" ).html( ui.item.desc );
            return false;*/
        }
    });
}