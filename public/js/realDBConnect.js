const firebaseConfig = {
    apiKey: "AIzaSyBOT8anAw6_uCx1ry-If7K_z_y842nOiUw",
    authDomain: "ecommerce2-aa05a.firebaseapp.com",
    databaseURL: "https://ecommerce2-aa05a-default-rtdb.firebaseio.com",
    projectId: "ecommerce2-aa05a",
    storageBucket: "ecommerce2-aa05a.appspot.com",
    messagingSenderId: "280685697688",
    appId: "1:280685697688:web:e5ff639a40da279f7c8eed"
};

firebase.initializeApp(firebaseConfig);
const realDBSearch = firebase.database();
const products = realDBSearch.ref("products");

//console.log(firebase);
function cleanTags(tags) {
    tags = tags.trim().toLowerCase();
    const arrTags = tags.split(" ");
    arrTags.forEach((tag) => {
        const index = arrTags.indexOf(tag);
        tag = tag.replaceAll(/[^0-9A-Za-z_\u0400-\u04FF]/gi, '').replaceAll(/\s+/g, ' ');
        arrTags[index] = tag;
    })
    return arrTags;
}

let youMayAlsoLikedResult = [];
let womenResult = [];
let menResult = [];
let shoesResult = [];
let accessoriesResult = [];
let womenSection = document.getElementById('womenResults');
let menSection = document.getElementById('menResults');
let shoesSection = document.getElementById('shoesResults');
let accessoriesSection = document.getElementById('accessoriesResults');


function loadData() {
    products.on("value", function (snapshot) {
        if (!snapshot.exists()) {
            console.log("No products found");
        } else {
            snapshot.forEach(function (element) {
                let data = element.val();
                data.id = element.key.toString().replace("-", "").trim();
                console.log(data.id);

                getCategoryProducts(data, '1');
                getCategoryProducts(data, '2');
                getCategoryProducts(data, '3');
                getCategoryProducts(data, '4');
                getCategoryProducts(data, '5');
            })
        }
        if(womenSection) {
            createResultCards(womenResult)
        } else if(menSection) {
            createResultCards(menResult)
        } else if(shoesSection) {
        createResultCards(shoesResult)
        } else if(accessoriesSection) {
            createResultCards(accessoriesResult)
        }

        createProductSlider('Accessories', 'product-accessories', accessoriesResult);
        createProductSlider('Shoes', 'product-shoes', shoesResult);
        createProductSlider('You may also like', 'product-you-may-also-liked', youMayAlsoLikedResult);
    });
}


function getCategoryProducts(data, category) {
    let itemCategories = data.category.toString().replaceAll(",", "");

    if (itemCategories.includes(category)) {
        switch (category) {
            case '1' : return youMayAlsoLikedResult.push(data);
            case '2' : return menResult.push(data);
            case '3' : return womenResult.push(data);
            case '4' : return shoesResult.push(data);
            case '5' : return accessoriesResult.push(data);
        }
    }
}

const createProductCard = (result) => {
    return `
         <div class="product-card" onclick="location.href='/product/${result.id}'">
             <div class="product-image">
                 <img src="${result.images[0]}" class="product-thumb" alt="">
<!--                 <img src = "../img/AJShop/bag-icon.png" class = "bag-quick" alt = "" >-->
             </div>
             <div class="product-info">
                <!-- <p class="product-name">${result.id}</p> -->
                 <p class="product-name">${result.name}</p>
                 <span class="actual-price">$${result.actualPrice}</span>
                 <span class="price">$${result.sellPrice}</span>
             </div>
         </div>
    `;
}

const createSearchResultCards = (searchResult, parent) => {
    let start = '<div class="product-search-container">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < searchResult.length; i++){
        if(searchResult[i].id !== decodeURI(location.pathname.split('/').pop())){
            middle += createProductCard(searchResult[i]);
        }
    }
    if(parent){
        let cardContainer = document.querySelector(parent);
        cardContainer.innerHTML = start + middle + end;
    } else{
        return start + middle + end;
    }
}

const createResultCards = (result) => {
    let start = '<div class="category-container">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < result.length; i++){
        if(result[i]){
            middle += createProductCard(result[i]);
        }
    }
    if(parent){
        let cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = start + middle + end;
    } else{
        return start + middle + end;
    }
}

const createProductSlider = (categoryTitle, categoryParent, categoryResult) => {

    const start = `
        <h2 class="section-heading">${categoryTitle}</h2>
        <button class="pre-btn"><img src="../img/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../img/arrow.png" alt=""></button>
        <div class="product-container">
    `;
    let middle = '';
    const end = '</div>';

    console.log("l = ", categoryResult.length);

    for(let i = 0; i < categoryResult.length; i++){
        console.log("categoryResult[i] = ", categoryResult[i]);
        console.log("categoryResult[i].id = ", categoryResult[i].id);
        middle += createProductCard(categoryResult[i]);
    }
    console.log(middle);

    let slideContainer = document.querySelector(`.product.${categoryParent}`);
    if(slideContainer){
        slideContainer.innerHTML = start + middle + end;
        console.log("slideContainer  class = ", slideContainer.getAttribute("class"));
        console.log("code = ", slideContainer.innerHTML);
    } else{
        return start + middle + end;
    }
    // setupSlidingEffect();
}