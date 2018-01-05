var huvudKat = "";
var produkter = "";
var underKat = "";

$(document).ready(function () {


    //Huvudkategori

    fetch("huvudkategorier.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            huvudKat = data;

            for (i = 0; i < huvudKat.length; i++) {

                var huvudKatId = huvudKat[i].id;
                var huvudKatMerch = huvudKat[i].title;
                var printHuvudKat = "";

                var printHuvudKat = '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" id="merch" href="#">' + huvudKat[i].title + '<span class="caret"></span></a><ul class="dropdown-menu" id="huvudKat' + huvudKatId + '"></ul></li>';
                $('#huvudKat').append(printHuvudKat);

            };
        });

    //Underkategori
    fetch("underkategorier.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            underKat = data;

            for (i = 0; i < underKat.length; i++) {

                var underKatId = underKat[i].id;
                var underKatItem = underKat[i].item;
                var underKatHuvud = underKat[i].huvudkategori;


                var underHuvudKat = '<li id="underKat' + underKatId + '"><a href="#">' + underKatItem + '</a></li>';

                if (underKatHuvud == 1) {
                    $('#huvudKat1').append(underHuvudKat);

                } else if (underKatHuvud == 2) {
                    $('#huvudKat2').append(underHuvudKat);


                } else {
                    $('#huvudKat3').append(underHuvudKat);
                }
            };
        });

    //Produkter
    fetch("produkter.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            produkter = data;

            $("#merch").click(function () {
                var produktCardList = [];
                $("#allProducts").html("");
                for (i = 0; i < produkter.length; i++) {

                    var produktId = produkter[i].id;
                    var produktName = produkter[i].prodName;
                    var produktDesc = produkter[i].prodDesc;
                    var produktImage = "images/" + produkter[i].image;
                    var produktPrice = produkter[i].prodPrice;
                    var produktHK = produkter[i].huvudKat;
                    var produktUK = produkter[i].underKat;

                    var produktCard = '<div class="col-sm-4"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-primary">Köp nu</a></div></div></div>';

                    produktCardList.push(produktCard)
                };
                $('#allProducts').append(produktCardList);
            });

        });

    $("#contact").click(function () {
        $(".content").hide();
        $(".contactPage").show();
        $(".contactPage").html("<p>contact@immanu-el.com</p>");

    });

    $("#info").click(function () {

        $(".content").hide();
        $(".contactPage").html("<div id ='info'>Yolo</p>");
    });

    $("#huvudKat").click(function () {
        $(".content").show();
        $("#allProducts").show();

    });

});