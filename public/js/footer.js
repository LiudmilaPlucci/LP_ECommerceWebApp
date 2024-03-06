const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
        <div class="footer-about" id="footer">
            <div class = "logo-slogan">
                <img src="../img/light-logo.png" class="logo" alt="">
<!--                <p class="slogan">Where Education Meets Innovation</p>-->
            </div>
            <div class="footer-about-container">
                <div class="about">
                    <p class="footer-title">About LPFashion Shop</p>
                    <p class="info">Welcome to LPFashion Shop, an educational e-commerce initiative
                        that seamlessly merges the worlds of education and technology.
                    </p>
                    <p class="info">LPFashion Shop is more than just an online marketplace — it's a project designed
                        to foster education, creativity, and practical skills.
                    </p>
                    <p class="info">As an LPFashion Shop dedicated and enthusiastic developer,
                        I am continuously bringing a fervent passion for education and technology to the forefront
                        of my work.
                    </p>
                    <p class="info">This portfolio showcases the project and initiative that reflect
                        my commitment to interactive technologies and user-friendly experiences.
                    </p>
                </div>
            </div>
        </div>
        <div class="footer-info-container">
            <ul class="contact-info">
                <li class="contact-info-title">Terms & Privacy:</li>
                <li><a href="#" class="contact-info-link">Terms & Services</a></li>
                <li><a href="#" class="contact-info-link">Privacy Policy</a></li>
            </ul>
            <ul class="contact-info">
                <li class="contact-info-title">Support Emails:</li>
                <li><a href="#" class="contact-info-link">help@lpfashion.com</a></li>
                <li><a href="#" class="contact-info-link">support@lpfashion.com</a></li>
            </ul>
            <ul class="contact-info">
                <li class="contact-info-title">Phones:</li>
                <li><a href="#" class="contact-info-link">1(800)1-LPFASHION</a></li>
                <li><a href="#" class="contact-info-link">1(800)111-2211</a></li>
            </ul>
            <ul class="contact-info">
                <li class="contact-info-title">Follow us:</li>
                <li><a href="#" class="contact-info-link">Instagram</a></li>
                <li><a href="#" class="contact-info-link">Twitter</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <br>
    </div>
    `;
}

createFooter();