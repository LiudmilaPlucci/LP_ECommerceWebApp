// create small product cards
const createSmallCards = (data) => {
    return `
     <div class="sm-product">
                    <img src="../img/product image 1.png" class="sm-product-img" alt="">
                    <div class="sm-text">
                        <p class="sm-product-name">BRAND</p>
                        <p class="sm-des">this is a short line about</p>
                    </div>
                    <div class="item-counter">
                        <button class="counter-btn decrement">-</button>
                        <p class="item-count">1</p>
                        <button class="counter-btn increment">+</button>
                    </div>
                    <p class="sm-price">$20</p>
                    <button class="sm-delete-btn"><img src="../img/close.png" alt=""></button>
                </div>
    `;
}