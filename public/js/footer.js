const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = ` 
       <div class="footer-content" id="footer-about">
            <img src="../img/light-logo.png" class="logo" alt="">
            
            <div class="footer-ul-content">
                <ul class="category">
                    <li class="category-title">men</li>
                    <li><a href="#" class="footer-link">t-shirts</a></li>
                    <li><a href="#" class="footer-link">sweatshirts</a></li>
                    <li><a href="#" class="footer-link">shirts</a></li>
                    <li><a href="#" class="footer-link">jeans</a></li>
                    <li><a href="#" class="footer-link">trousers</a></li>
                    <li><a href="#" class="footer-link">shoes</a></li>
                    <li><a href="#" class="footer-link">casuals</a></li>
                    <li><a href="#" class="footer-link">formals</a></li>
                    <li><a href="#" class="footer-link">sports</a></li>
                    <li><a href="#" class="footer-link">watch</a></li>
                </ul>
                <ul class="category">
                    <li class="category-title">women</li>
                    <li><a href="#" class="footer-link">t-shirts</a></li>
                    <li><a href="#" class="footer-link">sweatshirts</a></li>
                    <li><a href="#" class="footer-link">shirts</a></li>
                    <li><a href="#" class="footer-link">jeans</a></li>
                    <li><a href="#" class="footer-link">trousers</a></li>
                    <li><a href="#" class="footer-link">shoes</a></li>
                    <li><a href="#" class="footer-link">casuals</a></li>
                    <li><a href="#" class="footer-link">formals</a></li>
                    <li><a href="#" class="footer-link">sports</a></li>
                    <li><a href="#" class="footer-link">watch</a></li>
                </ul>
            </div>
         </div>
        <p class="footer-title">about company</p>
        <p class="info">Since its creation in 2022, LP ECommerce has established a design philosophy centred on creating modern menswear,
            womenswear, accessories, and childrenswear that transcends time and trends.
            With a London in-house atelier and a design team dedicated to delivering pieces that continuously embody its legacy,
            LP ECommerce today operates as a modern fashion house, offering attainable-luxury collections of unwavering elegance.
            Throughout five decades, LP ECommerce has established a unique style vocabulary - and conquered a loyal following of discerning individuals,
            stylish celebrities, and Royalty. ‘This Is Our Story’ tells the story and highlights of the brand from 2022 to the present day.</p>
        <p class="info">support emails - help@clothing.com, customersupport@clothing.com</p>
        <p class="info">telephone - 0333 777 4557, 0333 778 4558 </p>
        <div class="footer-social-container">
            <div>
                <a href="#" class="social-link">terms & services</a>
                <a href="#" class="social-link">privacy page</a>
            </div>
            <div>
                <a href="#" class="social-link">instagram</a>
                <a href="#" class="social-link">facebook</a>
                <a href="#" class="social-link">twitter</a>

            </div>
        </div>
        <p class="footer-credit">Clothing, Best apparels online store</p>
    
    `;
}

createFooter();