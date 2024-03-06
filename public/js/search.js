const searchKey = decodeURI(location.pathname.split('/').pop());
const searchSpanElement = document.querySelector("#search-key");

searchSpanElement.innerHTML = searchKey;
document.title = " Search Result for " + searchKey.toUpperCase();

let keyWords = searchKey;
keyWords = cleanKeyWords(keyWords);
console.log("keyWords = ", keyWords);

function cleanKeyWords(string) {
    return string.trim().toLowerCase()
        .replace(/[^0-9A-Za-z_\u0400-\u04FF]/gi, ' ')
        .replace(/\s+/g, ' ')
        .split(" ");
}

let result = [];
let tempResult = "";

function getSearchResult(data) {
    if(keyWords.length) {
        const id = data.id;
        let tags = data.tags.toString() + data.name.toString() + data.des.toString() + data.shortDes.toString();
        tags = cleanTags(tags);

        keyWords.forEach((keyWord) => {
            // console.log("keyWord = ", keyWord);
            if(keyWord.length > 2) {
                tags.forEach((tag) => {
                    // console.log("tag = ", tag);
                    if (tag.includes(keyWord)) {
                        // console.log("Yes!");
                        // console.log("tempResult = ", tempResult);
                        if (!tempResult.includes(id)) {
                            // console.log("Not included!");
                            tempResult += id + " ";
                            // console.log("tempResult = ", tempResult);

                            result.push(data);
                            console.log("searchResult", result);
                        }
                    }
                })
            }
        })
        return result;
    }
}



// function getSearchResult(data) {
//     const id = data.id;
//     let tags = data.tags.toString() + data.name.toString() + data.des.toString() + data.shortDes.toString();
//     tags = cleanTags(tags);
//
//     keyWords.forEach((keyWord) => {
//         console.log("keyWord = ", keyWord);
//         if(keyWord.length > 2) {
//             tags.forEach((tag) => {
//                 console.log("tag = ", tag);
//                 if (tag.includes(keyWord)) {
//                     console.log("Yes!");
//                     console.log("tempResult = ", tempResult);
//                     if (!tempResult.includes(id)) {
//                         console.log("Not included!");
//                         tempResult += id + " ";
//                         console.log("tempResult = ", tempResult);
//
//                         searchResult.push(data);
//                         console.log("searchResult", searchResult);
//                     }
//                 }
//             })
//         }
//     })
// }
//
//
// // fetch product cards
// const getProducts = (tag) => {
//     return fetch('/get-products', {
//         method: "post",
//         headers: new Headers({"Content-Type": "application/json"}),
//         body: JSON.stringify({tag: tag})
//     })
//         .then(res => res.json())
//         .then(data => {
//             return data;
//         })
// }
//
// const createProductCards = (searchResult, parent) => {
//     //here parent is for search product
//     let start = '<div class="product-search-container">';
//     let middle = ''; // this will contain card HTML
//     let end = '</div>';
//
//     for(let i = 0; i < searchResult.length; i++){
//         if(searchResult[i].id !== decodeURI(location.pathname.split('/').pop())){
//             middle += `
//             <div class="product-card">
//                 <div class="product-image">
//                      <img src="${searchResult[i].images[0]}" class="product-thumb" alt="">
// <!--                     <img src = "../img/AJShop/bag-icon.png" class = "bag-quick" alt = "" >-->
//                 </div>
//                 <div class="product-info" onclick="location.href="/products/${searchResult[i].id}">
//                     <p class="product-short-description">${searchResult[i].shortDes}</p>
//                     <span class="price">$${searchResult[i].sellPrice}</span>
//                 </div>
//             </div>
//             `
//         }
//     }
//
//     if(parent){
//         let cardContainer = document.querySelector(parent);
//         cardContainer.innerHTML = start + middle + end;
//     } else{
//         return start + middle + end;
//     }
// }
//
//
