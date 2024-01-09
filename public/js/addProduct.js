let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

//calculate actual price
const actPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    if(discountPercentage.value > 100) {
        discountPercentage.value = 90;
    }
    let discount = actPrice.value * discountPercentage.value / 100;
    sellingPrice.value = actPrice.value - discount;
})

//calculate discount percentage
sellingPrice.addEventListener('input', () => {
    discountPercentage.value = 100 - (sellingPrice.value * 100) / actPrice.value;
})

//form submission
const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#product-short-des');
const description = document.querySelector('#product-des');

let sizesSet = [];

const stockVal = document.querySelector('#stock');
const tagsSet = document.querySelector('#tags');
const tacCheck = document.querySelector('#tac');

const storeSizes = () => {
    sizesSet = [];
    let sizeCheckBox = document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item => {
        if(item.checked) {
            sizesSet.push(item.value);
        }
    })
}

const productData = () => {
    return {
        name: productName.value,
        shortDes: shortLine.value,
        des: description.value,
        images: downloadImagePaths,
        sizes: sizesSet,
        actualPrice: actPrice.value,
        discount: discountPercentage.value,
        sellPrice: sellingPrice.value,
        stock: stockVal.value,
        tags: tagsSet.value,
        tac: tacCheck.checked,
        email: ""
    }
}

const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
};


