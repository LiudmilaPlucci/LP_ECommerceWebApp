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

    title.innerHTML += " ";
    title.innerHTML += name.innerHTML = data.name;
}

let productId = null;
products.on("value", function (snapshot) {
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

// get current product id
let currentProductId = getCurrentProductId();

function getCurrentProductId() {
    if (location.pathname !== '/product') {

        return decodeURI(location.pathname.split('/').pop());
    }

    return 0;
}

console.log(currentProductId);


// order
let orderId = null;
let productsInActiveOrder = "";

const createOrderId = function () {
    const date = new Date();
    console.log("date", date.getTime());

    return date.getTime()
}

// //fetch active order if exists OR create active order if no orders found in DB
orders.on("value", function (snapshot) {
    if (!snapshot.exists()) {
        console.log("No orders found.");
    } else {
        snapshot.forEach(function (element) {
            let data = element.val();
            console.log("Existing Orders in DB: ", data);

            let orders = data.id;
            let ordersActive = data.active;
            let tempID = [];

            if (ordersActive !== null) {
                for (let i = 0; i < ordersActive.length; i++){
                    if (ordersActive[i]){
                       tempID.push(orders[i]);
                        console.log("!!!!!" + tempID);
                    }
                }
                orderId = data.id.valueOf();
                let active = data[orderId.active]
                console.log("Active order found: id = ", orderId)
                if (value.active){
                    console.log("!!!!!!!!!!" + orderId);
                }
            }
        })
    }
})

// //create active order if NO ACTIVE orders found in DB
if (orderId === null) {
    console.log("No active orders found.");

    orderId = createOrderId();
    db
        .ref('orders/' + orderId)
        .set({
            id: orderId.valueOf(),
            active: true
        });

    console.log("New active order created: id = ", orderId);
}

// //fetch productsIDs from active order OR create empty productsIds record in DB
productsIds.on("value", function (snapshot) {
    if (!snapshot.exists() && productsInActiveOrder === "") {
        console.log("No productsInOrder found");

        db
            .ref('productsIds/')
            .set({
                ids: productsInActiveOrder
            });
    } else {
        snapshot.forEach(function (element) {
            console.log("productsInActiveOrder variable before updating = ", productsInActiveOrder);

            productsInActiveOrder = element.val();

            console.log("productsInActiveOrder variable after updating = ", productsInActiveOrder);
        });
    }
})



// function getOrderId() {
//
//     orderid.on("value", function (snapshot) {
//         if (!snapshot.exists()) {
//             console.log("No products found");
//         } else {
//             snapshot.forEach(function (element) {
//                 let data = element.val();
//                 data.id = element.key.toString().replace("+ ", "").trim();
//                 if (location.pathname !== '/product') {
//                     productId = decodeURI(location.pathname.split('/').pop());
//                 }
//                 getProductById(data, productId);
//             })
//         }
//     })
// }
//
// const validateForm = (checkedSizeId) => {
//     if (productId === 0) {
//         return showAlert('Product id not found.');
//     } else if (checkedSizeId == null || checkedSizeId === "") {
//         return showAlert('Please select a size.');
//     }
//     return true;
// }
//
// let isOrderExisting;
// const orderId = createOrderId();
// orders.on("value", function (snapshot) {
//     if (!snapshot.exists()) {
//         console.log("No orders found");
//         isOrderExisting = false;
//         createNewOrder(orderId, new Date());
//         isOrderExisting = true;
//         console.log("****************** Order created ");
//     } else {
//         snapshot.forEach(function (element) {
//             let data = element.val();
//             if (data.active === true) {
//                 isOrderExisting = true;
//                 getOrderById(data, data.id);
//             } else {
//                 isOrderExisting = false;
//                 createNewOrder(orderId, new Date());
//                 isOrderExisting = true;
//                 console.log("******************!!!!!!!!!! Order created ");
//             }
//         })
//     }
// })
// const createOrderId = function () {
//     const date = new Date();
//     return date.getTime()
// }
//
// const productsInOrder = [{productId, checkedSizeId, quantity}];
// let totalPrice;
//
// function addProductToOrder(
//     orderId, productsInOrder, totalPrice) {
//     db
//         .ref('orders/' + orderId)
//         .set({
//             products: productsInOrder,
//             total: totalPrice.value
//         });
//     showAlert("Product added to cart successfully.");
// }
//
// function createNewOrder(
//     orderId, orderDate) {
//     db
//         .ref('orders/' + orderId)
//         .set({
//             id: orderId.value,
//             date: orderDate.value,
//             active:true,
//         });
//     showAlert("Order created successfully.");
// }
//
// const addToCartBtn = document.querySelector("#addToCart");
// addToCartBtn.addEventListener('click', function (e) {
//
//     const checkedSizeId = document.querySelector("label[class='size-radio-btn check']").id;
//
//     if (validateForm(checkedSizeId)) {
//         loader.style.display = 'block';
//         addProductToOrder(orderId, productsInOrder, totalPrice);
//         location.reload();
//     }
// })









