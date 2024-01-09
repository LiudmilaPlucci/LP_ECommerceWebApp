const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
        <div class = "nav">
            <a href="/">
                <img src="../img/dark-logo.png" class="brand-logo" id="logo" alt="">
            </a>
            <div class="nav-items">
                    <div class="search" data-search_bar-id="search_bar">
                         <input type="text" class="search-box" placeholder="Search brand, product...">
                         <button class="search-btn" data-search_btn-id="search_btn">Search</button>
                     </div>
                <a>
                    <img src="../img/user.png" id="user-img" alt="">
                    <div class="login-logout-popup hide"> 
                        <p class="account-info">Log in as, name</p> 
                        <button class="btn" id="user-btn">Log out</button>
                    </div>
                </a>
                <a href="#"><img src="../img/cart.png" alt=""></a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="/" class="link">home</a></li>
            <li class="link-item"><a href="/women" class="link">women</a></li>
            <li class="link-item"><a href="/men" class="link">men</a></li>
            <li class="link-item"><a href="/shoes" class="link">shoes</a></li>
            <li class="link-item"><a href="/accessories" class="link">accessories</a></li>
            <li class="link-item"><a href="#footer-about" class="link">about</a></li>
        </ul>
        
        
    `;
}

createNav();

// login functionality

// const userImageButton = document.querySelector('#user-img');
// const userPopup = document.querySelector('.login-logout-popup');
// const popupText = document.querySelector('.account-info');
// const actionBtn = document.querySelector('#user-btn');
//
// userImageButton.addEventListener('click', () => {
//     userPopup.classList.toggle('hide');
// })
//
// window.onload = () => {
//     let user = JSON.parse(sessionStorage.user || null);
//     if(user != null) {
//         popupText.innerHTML = `log in as, ${user.name}`;
//         actionBtn.innerHTML = 'log out';
//         actionBtn.addEventListener('click', () => {
//             sessionStorage.clear();
//             location.reload();
//         })
//     } else {
//         //user is logged out
//         popupText.innerHTML = 'log in to place order';
//         actionBtn.innerHTML = 'log in';
//         actionBtn.addEventListener('click', () => {
//             location.href = '/login';
//         })
//     }
// }
// // search box
//
// const searchBtn = document.querySelector('.search-btn');
// const searchBox = document.querySelector('.search-box');
// searchBtn.addEventListener('click', () => {
//     if(searchBox.value.length) {
//         location.href = `/search/${searchBox.value}`;
//     }
// })

//get search Box and search button
const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');

//change searchBtn color if search is not empty
searchBox.addEventListener('input', () => {
    if(searchBox.value.length) {
        searchBtn.style.background = '#BEC6B7';
        searchBtn.style.transition = '.7s';
    } else {
        searchBtn.style.background = 'none';
        searchBtn.style.transition = '.7s';
    }
})

//listen for click --> open search page and input search value to the search url end-point
searchBtn.addEventListener('click', () => {
    if(searchBox.value.length) {
        location.href = `/search/${searchBox.value}`;
    }
})

//listen for enter --> open search page and input search value to the search url end-point
searchBox.addEventListener('keypress', function(event) {
    if(searchBox.value.length && event.keyCode === 13) {
        location.href = `/search/${searchBox.value}`
    }
})

