// fetch('produkter.json')
// .then(function(data) {
//     console.log(data)
//     return data.json();
// })
// .then(function(data) {
//     console.log('alla produkter', data);
//     var undercat = data.filter(function(product) {
//         return product.underKat === 1;
//     });

//     console.log('alla produkter i underkategori 1', undercat);
//     var productsHtml = data.map(function(product){
//         return '<div class="col card product">'+ product.prodName + '</div>';
//       })

//       $('.products').append(productsHtml)
// })

fetch("produkter.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        produkter = data;

        for (i = 0; i < produkter.length; i++) {

            var produktId = produkter[i].id;
            var produktName = produkter[i].prodName;
            var produktDesc = produkter[i].prodDesc;
            var produktImage = "images/" + produkter[i].image;
            var produktPrice = produkter[i].prodPrice;
            var produktHK = produkter[i].huvudKat;
            var produktUK = produkter[i].underKat;
            var produktCard = "";

            //var produktCard = '<div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><a href="#" class="btn btn-primary">Köp nu</a></div></div>';

            var produktCard = '<div class="col-sm-4"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-primary">Köp nu</a></div></div></div>';
            console.log(produktCard);
            $('#allProducts').append(produktCard);

        };


    });

