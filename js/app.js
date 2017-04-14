var usuario;

var viewdiv = function (e) {
    //Si el boton tiene asignada la clase "active"  no hace nada de lo contrario se va por el else.
    if ($(e.target).parent().hasClass("active")) {} else {
        $('li').removeClass("active");
        $($(e.target).parent()).addClass("active");
        if (e.target.id == "register") {
            $(".login").fadeToggle("slow", function () {
                $(".login").hide();
                $('.' + e.target.id).fadeToggle("slow");
            })
        } else {
            $(".register").fadeToggle("slow", function () {
                $(".register").hide();
                $('.' + e.target.id).fadeToggle("slow");
            })
        }
    }
}



var addlisters = function () {
    searchplace();
    $("#loginout").click(function () {
        loginOut();
        window.location = '../index.html';
    });
}
















