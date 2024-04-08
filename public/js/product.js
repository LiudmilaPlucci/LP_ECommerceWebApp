const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlide = 0;

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = i;
    })
})

// toggle size buttons

const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtn = 0;
let size;

sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
        size = item.innerHTML;
    })
})

const setData = (data) => {
    let title = document.querySelector('title');

    productImages.forEach((img, i) => {
        if (data.images[i]) {
            img.src = data.images[i];
        } else {
            img.style.display = 'none';
        }
    })
    productImages[0].click();

    //setup size buttons
    sizeBtns.forEach(item => {
        if (!data.sizes.includes(item.innerHTML)) {
            item.style.display = 'none';
        }
    })

    //setting up texts
    // const name = document.querySelector('.product-brand');
    // const shortDes = document.querySelector('detail-short-des');
    // const des = document.querySelector('.des');

    title.innerHTML += " ";
    title.innerHTML += name.innerHTML = data.name;

    // shortDes .innerHTML = data.des;
    //
    // // pricing
    // const sellPrice = document.querySelector('product-price')
    // const actualPrice = document.querySelector('product-actual-price')
    // const discount = document.querySelector('product-discount')
    //
    // sellPrice.innerHTML = `$${data.sellPrice}`;
    // actualPrice.innerHTML = `$${data.sellPrice}`;
    // discount.innerHTML = `( ${data.discount}% off )`;
    //
    // // wishlist and card button
    // const wishListButton = document.querySelector('.wishlist-btn');
    // wishListButton.addEventListener('click', () => {
    //     wishListButton.innerHTML = add_product_to_card_ot_wishlist('wishlist', data);
    // })
    //
    // const cardBtn = document.querySelector('.card-btn');
    // cardBtn.addEventListener('click', () => {
    //     cardBtn.innerHTML = add_product_to_card_ot_wishlist('cart', data);
    // })
}

// //Fetch data
// const fetchProductData = () => {
//     fetch('/get-products', {
//         method: 'post',
//         headers: new Headers({'Content-Type': 'application/json'}),
//         body: JSON.stringify({id: productID})
//     })
//         .then(res => res.json())
//         .then(data => {
//             setData(data);
//             getProducts(data.tags[1])
//                 .then(data => createProductSlider(
//                     data, '.container-for-card-slider', 'similar product')
//                 )
//         })
//         .catch(err => {
//             location.replace('/404');
//         });
// }

let productId = null;
products.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No products found");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            data.id = element.key.toString().replace("+ ", "").trim();

            let productId = null;
            if (location.pathname !== '/product') {
                productId = decodeURI(location.pathname.split('/').pop());
            }
            getProductById(data, productId);
        })
    }
})



function getOrderId() {

    orderid.on("value", function (snapshot) {
        if (!snapshot.exists()) {
            console.log("No products found");
        } else {
            snapshot.forEach(function (element) {
                let data = element.val();
                data.id = element.key.toString().replace("+ ", "").trim();

                if (location.pathname !== '/product') {
                    productId = decodeURI(location.pathname.split('/').pop());
                }
                getProductById(data, productId);
            })
        }
    })
}

const validateForm = (checkedSizeId) => {
    if (productId === 0) {
        return showAlert('Product id not found.');
    } else if (checkedSizeId == null || checkedSizeId === "") {
        return showAlert('Please select a size.');
    }
    return true;
}

let isOrderExisting;
const orderId = createOrderId();
orders.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No orders found");
        isOrderExisting = false;
        createNewOrder(orderId, new Date());
        isOrderExisting = true;
        console.log("****************** Order created ");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            if (data.active === true) {
                isOrderExisting = true;
                getOrderById(data, data.id);
            } else {
                isOrderExisting = false;
                createNewOrder(orderId, new Date());
                isOrderExisting = true;
                console.log("******************!!!!!!!!!! Order created ");
            }
        })
    }
})
const createOrderId = function () {
    const date = new Date();
    return date.getTime()
}

const productsInOrder = [{productId, checkedSizeId, quantity}];
let totalPrice;

function addProductToOrder(
    orderId, productsInOrder, totalPrice) {
    db
        .ref('orders/' + orderId)
        .set({
            products: productsInOrder,
            total: totalPrice.value
        });
    showAlert("Product added to cart successfully.");
}

function createNewOrder(
    orderId, orderDate) {
    db
        .ref('orders/' + orderId)
        .set({
            id: orderId.value,
            date: orderDate.value,
            active:true,
        });
    showAlert("Order created successfully.");
}

const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener('click', function (e) {

    const checkedSizeId = document.querySelector("label[class='size-radio-btn check']").id;

    if (validateForm(checkedSizeId)) {
        loader.style.display = 'block';
        addProductToOrder(orderId, productsInOrder, totalPrice);
        location.reload();
    }
})









