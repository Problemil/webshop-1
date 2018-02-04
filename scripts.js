var huvudKat = "";
var produkter = "";
var underKat = "";
var user = "admin";
var password = "admin";

var addProduct
var deleteProduct
var showInfo

$(document).ready(function () {

    if (sessionStorage.ourUser == null) {
        // Är vi inte inloggade

        visaFirstVisit();
    } else {
        //om vi är inloggade

        visaSomInloggad();
    }

    //syns vid start utloggad
    function visaFirstVisit() {
        $(".loginButton").show();
        $(".logoutButton").hide();
        $(".namn").hide();
        $(".user").show();
        $(".password").show();

    };

    //syns på start när man är inloggad
    function visaSomInloggad() {
        $(".loginButton").hide();
        $(".logoutButton").show();
        $(".user").hide();
        $(".password").hide();

    };

    var setProductList = [];

    if (sessionStorage.productList == null) {
        var json_str = JSON.stringify(setProductList);
        sessionStorage.productList = json_str;

        console.log("tom storage skapad");
    }

    //KASSAN

    var parseProductList = JSON.parse(sessionStorage.productList);

    totalAmount = 0;
    fraktAmount = 55;

    for (var i = 0; i < parseProductList.length; i++) {

        var produktId = parseProductList[i].id;
        var produktName = parseProductList[i].prodName;
        var produktDesc = parseProductList[i].prodDesc;
        var produktImage = "images/" + parseProductList[i].image;
        var produktPrice = parseProductList[i].prodPrice
        var produktHK = parseProductList[i].huvudKat;
        var produktUK = parseProductList[i].underKat;
        var produktCard = '<div class="col-sm-4"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><p>Pris: ' + produktPrice + '</p><a href="kassa.html" class="btn btn-primary" onclick="deleteProduct(' + i + ')">Ta bort</a></div></div></div>';

        var totalAmount = totalAmount + produktPrice



        $(".printKassa").append(produktCard);
    }

    $(".totalAmount").append(totalAmount + fraktAmount + ":- " + "inkl frakt");

    addProduct = function (val) {
        console.log(produkter[val]);

        var parseProductList = JSON.parse(sessionStorage.productList);

        parseProductList.push(produkter[val]);

        var json_str = JSON.stringify(parseProductList);
        sessionStorage.productList = json_str;
        alert("lagt i varukorgen!")
    }

    deleteProduct = function (index) {
        var parseProductList = JSON.parse(sessionStorage.productList);

        // var shoppingCart = JSON.parse(sessionStorage.shoppingCart);

        parseProductList.splice(index, 1);

        var json_str = JSON.stringify(parseProductList);
        sessionStorage.productList = json_str;
        $(".printKassa").html("");

        for (var i = 0; i < parseProductList.length; i++) {

            var produktId = parseProductList[i].id;
            var produktName = parseProductList[i].prodName;
            var produktDesc = parseProductList[i].prodDesc;
            var produktImage = "images/" + parseProductList[i].image;
            var produktPrice = parseProductList[i].prodPrice;
            var produktHK = parseProductList[i].huvudKat;
            var produktUK = parseProductList[i].underKat;
            var produktCard = '<div class="col-sm-4"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-primary" onclick="deleteProduct(' + i + ')">Ta bort</a></div></div></div>';

            $(".printKassa").append(produktCard);
        }
    }

    deleteStorage = function () {
        sessionStorage.clear();
        location.reload();
    }


    finishOrder = function() {

        if (sessionStorage.ourUser == null) {
            
            alert("Du måste logga in först!")

        } else {
           
            $(".container").html("Tack för din order :)");

        }
    }

    //HUVUDKATEGORI

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

                var printHuvudKat = '<li class="dropdown"><a class="dropdown-toggle visaProdukter" data-toggle="dropdown" id="merch" href="#">' + huvudKat[i].title + '<span class="caret"></span></a><ul class="dropdown-menu" id="huvudKat' + huvudKatId + '"></ul></li>';
                $('#huvudKat').append(printHuvudKat);

            };
        })

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


                var underHuvudKat = '<li class="visaProdukter" data-under-kat="' + underKatId + '" id="underKat' + underKatId + '"><a href="#">' + underKatItem + '</a></li>';

                if (underKatHuvud == 1) {
                    $('#huvudKat1').append(underHuvudKat);

                } else if (underKatHuvud == 2) {
                    $('#huvudKat2').append(underHuvudKat);

                } else if (underKatHuvud == 3) {
                    $('#huvudKat3').append(underHuvudKat);

                } else {
                    $('#huvudKat4').append(underHuvudKat);
                }
            };
        });

    //PRODUKTER
    
    fetch("produkter.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            produkter = data;

            $(".visaProdukter").click(function () {
                var produktCardList = [];
                var uk = $(this).data('under-kat');

                $('.content').show();
                $('.contactPage').html('');
                $('.info').html('');
                $("#allProducts").html("");
                for (i = 0; i < produkter.length; i++) {

                    var produktId = produkter[i].id;
                    var produktName = produkter[i].prodName;
                    var produktDesc = produkter[i].prodDesc;
                    var produktImage = "images/" + produkter[i].image;
                    var produktPrice = produkter[i].prodPrice;
                    var produktHK = produkter[i].huvudKat;
                    var produktUK = produkter[i].underKat;

                    produktCard = '<div class="col-sm-4"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h5 class="card-title"><br/>' + produktName + '</h5><p class="card-text">' + produktDesc + '</p><p>Pris: ' + produktPrice + '</p><a class="btn btn-primary" onclick="addProduct(' + i + ')">Köp nu</a></div></div></div>';

                    if (!uk || uk === produktUK) {
                        produktCardList.push(produktCard);

                    }
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
        $(".text").hide();
    });

    //Loggan
    $('#logga').click(function () {
        console.log("du är på start");
        location.reload();
    });

    //Login-knappen
    $(".loginButton").click(function () {

        if ($(".user").val() == user && $(".password").val() == password) {
            alert("välkommen!");
            sessionStorage.setItem("ourUser", $(".user").val());
            visaSomInloggad();

        } else {
            console.log("fel lösenord!");
            alert("Fel lösenord, var god försök igen!");
        }
    });

    //Logout-knappen
    $(".logoutButton").click(function () {
        console.log("du är utloggad");
        sessionStorage.clear()
        location.reload();
        visaFirstVisit();
    });

    //Kundvagn
    $('#shoppingCart').click(function () {
        console.log("Nu hamna vi i kundvagnen :)");
        //$(".container").html("");
    });


});