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
const db = firebase.database();
const realDBSearch = firebase.database();
const products = realDBSearch.ref("products");
const orders = realDBSearch.ref("orders");
const productsIds = db.ref("productsIds");
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
let womenShoesResult = [];
let menShoesResult = [];
// let womenMenShoesResult = womenShoesResult;
// let womenMenShoesResult = [];

// womenMenShoesResult.concat(womenShoesResult);
// womenMenShoesResult.push(...womenShoesResult, ...menShoesResult);
// womenMenShoesResult.concat(...menShoesResult);
let womenSection = document.getElementById('womenResults');
let menSection = document.getElementById('menResults');
let shoesSection = document.getElementById('shoesResults');
let accessoriesSection = document.getElementById('accessoriesResults');
let womenShoesSection = document.getElementById('womenShoesResults');
let menShoesSection = document.getElementById('menShoesResults');
// let womenMenShoesSection = document.getElementById('womenMenShoesResults');


function loadData() {
    products.on("value", function (snapshot) {
        if (!snapshot.exists()) {
            console.log("No products found");
        } else {
            snapshot.forEach(function (element) {
                let data = element.val();
                data.id = element.key.toString().replace("+ ", "").trim();
                console.log(data.id);

                getCategoryProducts(data, '1');
                getCategoryProducts(data, '2');
                getCategoryProducts(data, '3');
                getCategoryProducts(data, '4');
                getCategoryProducts(data, '5');
                getCategoryProducts(data, '6');
                getCategoryProducts(data, '7');

            })
        }
        if (womenSection) {
            createResultCards(womenResult);
        } else if (menSection) {
            createResultCards(menResult);
        } else if (shoesSection) {
            // createResultCards(shoesResult);
            createResultsCards(womenShoesResult, menShoesResult);
        } else if (accessoriesSection) {
            createResultCards(accessoriesResult);
        } else if (womenShoesSection) {
            createResultCards(womenShoesResult);
        } else if (menShoesSection) {
            createResultCards(menShoesResult);
        // } else if (womenMenShoesSection) {
        //     createResultCards(womenMenShoesResult)
        }

        createProductSlider('Accessories', 'product-accessories', accessoriesResult);
        createProductSlider('Shoes', 'product-shoes', shoesResult);
        createProductSlider('You may also like', 'product-you-may-also-liked', youMayAlsoLikedResult);
        createProductSlider('Women Shoes', 'product-women-shoes', womenShoesResult);
        createProductSlider('Men Shoes', 'product-men-shoes', menShoesResult);
    });
}


function getCategoryProducts(data, category) {
    let itemCategories = data.category.toString().replaceAll(",", "");

    if (itemCategories.includes(category)) {
        switch (category) {
            case '1' :
                return youMayAlsoLikedResult.push(data);
            case '2' :
                return menResult.push(data);
            case '3' :
                return womenResult.push(data);
            case '4' :
                return shoesResult.push(data);
            case '5' :
                return accessoriesResult.push(data);
            case '6' :
                return womenShoesResult.push(data);
            case '7' :
                return menShoesResult.push(data);
        }
    }
}

function getProductById(data, id) {
    // data.forEach((item) => {
    let itemId = data.id.toString().replaceAll("+ ", "");
    if (itemId === id) {
        //setting up texts
        const name =  document.querySelector('.product-brand');
        const shortDes = document.querySelector('.product-short-des');
        const des = document.querySelector('.des');

        name.innerHTML = data.name
        shortDes.innerHTML = data.shortDes;
        des.innerHTML = data.des;

        // pricing
        const sellPrice = document.querySelector('.product-price');
        const actualPrice = document.querySelector('.product-actual-price');
        const discount = document.querySelector('.product-discount');

        let $$;
        sellPrice.innerHTML = `$${data.sellPrice}`;
        actualPrice.innerHTML = `$${data.actualPrice}`;
        discount.innerHTML = `( ${data.discount}% off )`;

        setData(data)

        // wishlist and cart btn
        const wishlistBtn = document.querySelector('.wishlist-btn');
        // wishlistBtn.addEventListener('click', () => {
        //     wishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', data);
        // })

        const cartBtn = document.querySelector('.cart-btn');
        // cartBtn.addEventListener('click', () => {
        //     cartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', data);
        // })
    }
    // })
}

function getOrderById(data, id) {
    // data.forEach((item) => {
    let orderId = data.id.toString();
    if (orderId === id) {
        //setting up texts
        const name =  document.querySelector('.product-brand');
        const shortDes = document.querySelector('.product-short-des');
        const des = document.querySelector('.des');

        name.innerHTML = data.name
        shortDes.innerHTML = data.shortDes;
        des.innerHTML = data.des;

        // pricing
        const sellPrice = document.querySelector('.product-price');
        const actualPrice = document.querySelector('.product-actual-price');
        const discount = document.querySelector('.product-discount');

        let $$;
        sellPrice.innerHTML = `$${data.sellPrice}`;
        actualPrice.innerHTML = `$${data.actualPrice}`;
        discount.innerHTML = `( ${data.discount}% off )`;

        setData(data)

        // wishlist and cart btn
        const wishlistBtn = document.querySelector('.wishlist-btn');
        // wishlistBtn.addEventListener('click', () => {
        //     wishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', data);
        // })

        const cartBtn = document.querySelector('.cart-btn');
        // cartBtn.addEventListener('click', () => {
        //     cartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', data);
        // })
    }
    // })
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

    for (let i = 0; i < searchResult.length; i++) {
        if (searchResult[i].id !== decodeURI(location.pathname.split('/').pop())) {
            middle += createProductCard(searchResult[i]);
        }
    }
    if (parent) {
        let cardContainer = document.querySelector(parent);
        cardContainer.innerHTML = start + middle + end;
    } else {
        return start + middle + end;
    }
}

const createResultCards = (result) => {
    let start = '<div class="category-container">';
    let middle = '';
    let end = '</div>';

    for (let i = 0; i < result.length; i++) {
        if (result[i]) {
            middle += createProductCard(result[i]);
        }
    }
    if (parent) {
        let cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = start + middle + end;
    } else {
        return start + middle + end;
    }
}

const createResultsCards = (result1, result2) => {
    let start = '<div class="category-container">';
    let middle = '';
    let end = '</div>';

    // middle+=  `<h2 className="section-heading">Women Shoes</h2>`;

    for (let i = 0; i < result1.length; i++) {
        if (result1[i]) {
            middle += createProductCard(result1[i]);
        }
    }

    middle+=  `<h2 className="section-heading">Men Shoes</h2>`;

    for (let i = 0; i < result2.length; i++) {
        if (result2[i]) {
            middle += createProductCard(result2[i]);
        }
    }
    if (parent) {
        let cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = start + middle + end;
    } else {
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

    for (let i = 0; i < categoryResult.length; i++) {
        console.log("categoryResult[i] = ", categoryResult[i]);
        console.log("categoryResult[i].id = ", categoryResult[i].id);
        middle += createProductCard(categoryResult[i]);
    }
    console.log(middle);

    let slideContainer = document.querySelector(`.product.${categoryParent}`);
    if (slideContainer) {
        slideContainer.innerHTML = start + middle + end;
        console.log("slideContainer  class = ", slideContainer.getAttribute("class"));
        console.log("code = ", slideContainer.innerHTML);
    } else {
        return start + middle + end;
    }
    setupSlidingEffect();
}

const setupSlidingEffect = () => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        //  прокрутка товара
        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })

    })
}
