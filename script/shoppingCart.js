// ************************   show search Result  **********************************
document.getElementById("searchButton").addEventListener("click", () => {
  showSearchResult();
});
document.getElementById("mobileSearchButton").addEventListener("click", () => {
  showSearchResult();
});
// ************************   show search Result in page  ******************************
function showSearchResult() {
  let inputValue;
  if (window.innerWidth > 1272) {
    inputValue = document.getElementById("searchInput").value;
  } else {
    inputValue = document.getElementById("mobileSearchInput").value;
  }
  localStorage.setItem("searchValue", inputValue);
  location.href = "search.html";
}
 
function showPagination(noOfPages, resultArr) {
  let paginationHandler = document.getElementById("paginationHandler");
  let htm = ``;
  htm += `<li class="active-pagination">1</li>`;

  for (let i = 2; i <= noOfPages; i++) {
    htm += `<li>${i}</li>`;
  }
  paginationHandler.innerHTML = htm;
  handlePagination(resultArr);
}
function showSearchResultContent(data) {
  let container = ``;
  container += `
                <div class="item">
                <div class="featured-products-card" id="searchItem">
                <div class="image-container">
                <img src="${data.img}" alt="">

                <div class="labels">
                <div class="cross-labels">
                `;
  for (k in data.crossLabel) {
    container += `
                  <p class="blue-bg">
                  <strong>${data.crossLabel[k]}</strong>
                  </p>
                  `;
  }
  container += `
                </div>
                <div class="right-labels">
                `;
  for (j in data.rightLabels) {
    if (j % 2 == 0) {
      container += `
                                          <p class="yellow-bg ">
                                          <strong>${data.rightLabels[j]}</strong>
                                          </p>
                                          `;
    } else {
      container += `
                                          <p class="red-bg ">
                                          <strong>${data.rightLabels[j]}</strong>
                                          </p>
                                          `;
    }
  }
  container += `
                                     </div>
                           </div>
                           </div>
                           <div class="cart-container">
                           <h2>${data.name}</h2>
                           <p class="price">${data.discountedPrice} </p>
                           <hr>
                           <div class="add-to-cart-container">
                           <div>
                           <input type="button" onclick="addToCart(${data.id})" value="ADD TO CART">
                           </div>
                           <div>
                           <i style="font-weight:100" class="fa-solid fa-heart"></i>
                           <i class="fa-solid fa-arrow-right-arrow-left"></i>
                           </div>
                           </div>
                       </div>
                   </div>
                   </div>
                   `;
  return container;
}

// ************************   show mobile search bar  *****************************
function showSearchBar() {
  let searchBar = document.getElementById("mobile-search-bar");
  searchBar.classList.toggle("show-mobile-search-bar");
}

showCartItem();
async function showCartItem() {
  let cartItemContainer = document.getElementById("cart-item");
  let container = ``;
  let response = await fetch("./script/products.json");
  let responsData = await response.json();
  let data = responsData.productData;
  let cartArr = JSON.parse(localStorage.getItem("cartData")).cartArr;
  let noOfItem = JSON.parse(localStorage.getItem("cartData")).noOfItem;
  let cartItem = data.filter((item) => {
    if (cartArr.includes(item.id)) {
      return item;
    }
  });
  cartItem.forEach((element) => {
    container += showCartDetails(element, noOfItem);
  });
  cartItemContainer.innerHTML = container;
}

function showCartDetails(data, noOfItem) {
  let container = ``;
  container += `
        <div class="item">
          <div class="featured-products-card">
            <div class="image-container">
              <img src="${data.img}" alt="" />
            </div>
          </div>

          <div class="cart-container">
            <h2>${data.name}</h2>
            <p class="price">
              ${data.discountedPrice}
            </p>
            <div class="add-to-cart-container">
              <div>
                  <input type="button" onclick="removeFromCart(${data.id})" value="Remove">
                      </div>
            </div>
          </div>
        </div>

      `;

  return container;
}
function removeFromCart(productId) {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  let cartArr = cartData.cartArr;
  cartArr.splice(cartArr.indexOf(productId), 1);
  localStorage.setItem("cartData", JSON.stringify(cartData));
  location.assign("shoppingCart.html");
}
// show total item in cart
totalItemInCart();
function totalItemInCart() {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  document.getElementById("item-counter").innerHTML = cartData.cartArr.length;
  document.getElementById("total-cart-price").innerHTML =
    cartData.cartArr.length * 999;
}
 
 
function showPagination(noOfPages, resultArr) {
  let paginationHandler = document.getElementById("paginationHandler");
  let htm = ``;
  htm += `<li class="active-pagination">1</li>`;

  for (let i = 2; i <= noOfPages; i++) {
    htm += `<li>${i}</li>`;
  }
  paginationHandler.innerHTML = htm;
  handlePagination(resultArr);
}
 
//on clicking pagination
function handlePagination(resultArr) {
  document.getElementById("paginationHandler").childNodes.forEach((elem) => {
    elem.addEventListener("click", () => {
      let innerValue = parseInt(elem.innerText);
      let start = (innerValue - 1) * 4;
      let end = start + 4 - 1;
      let activElem = document.getElementsByClassName("active-pagination")[0];
      activElem.classList.remove("active-pagination");
      elem.classList.add("active-pagination");
      let whyBuyContainer = document.getElementById("searchCard");
      let container = ` <div class="search-result" >`;
      while (start <= end) {
        if (start == resultArr.length) break;
        container += showSearchResultContent(resultArr[start]);
        start++;
      }
      whyBuyContainer.innerHTML = container;
    });
  });
}
 
// *************   show hide navbar item sale and new container**********************
var bottomNavbar = document.getElementById("fixed-bottom-navbar");
var topPos = bottomNavbar.offsetTop;
window.onscroll = function () {
  showHIdeNav();
};
function showHIdeNav() {
  let saleContainer = document.getElementsByClassName("sale-container")[0];
  let newContainer = document.getElementsByClassName("new-container")[0];
  if (window.pageYOffset >= topPos) {
    bottomNavbar.style.position = "fixed";
    saleContainer.style.display = "none";
    newContainer.style.display = "none";
  } else {
    bottomNavbar.style.transition = ".5s ease";
    bottomNavbar.style.position = "static";

    newContainer.style.display = "block";
    saleContainer.style.display = "block";
  }
}
// ******************************** add to cart   ************************
function addToCart(productId) {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  if (cartData.cartArr.includes(productId)) {
    alert("item already in cart");
  } else {
    if (cartData) {
      cartData.cartArr.push(productId);
      localStorage.setItem("cartData", JSON.stringify(cartData));
    } else {
      let cartData = {
        cartArr: [],
      };
      cartData.cartArr.push(productId);
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }
    alert("item added");
    totalItemInCart();
  }
}

// on clicking register button
function signUpForm() {
  localStorage.setItem("loginFormStatus", true);
  location.assign("login.html");
}

// display current user name text

window.onload = function () {
  setCurrentUser();
};
function setCurrentUser() {
  let loginData = JSON.parse(localStorage.getItem("loginData"));
  let userIndx = getCurrentLoggedUserIndex(loginData.loginArr);
  if (userIndx) {
    let username = loginData.loginArr[userIndx].username;
    document.getElementById("currentUser").innerHTML = username.toUpperCase();
    // document.getElementById("currentUser-mobile").innerHTML = username.toUpperCase();
    document.getElementById("currentUser").style.color = "blue";
    document.getElementById("login-logout-text").innerText = "Log Out";
    document.getElementById("login-logout-text-mobile").innerText = "Log Out";
  } else {
    document.getElementById("currentUser").innerHTML = "";
    // document.getElementById("currentUser-mobile").innerHTML = "";
    document.getElementById("login-logout-text").innerText = "Login";
    document.getElementById("login-logout-text-mobile").innerText = "Login";
  }
} //on clicking login button for mobile nav
document
  .getElementById("login-logout-click-mobile")
  .addEventListener("click", () => {
    let bool = localStorage.getItem("loginFormStatus");
    bool = bool == "false" ? true : false;
    if (
      bool &&
      document.getElementById("login-logout-text-mobile").innerText == "Login"
    ) {
      location.assign("login.html");
    } else {
      document.getElementById("login-logout-text-mobile").innerText = "Login";
      let loginData = JSON.parse(localStorage.getItem("loginData"));
      let currentUserIndex = getCurrentLoggedUserIndex(loginData.loginArr);
      loginData.loginArr[currentUserIndex].logedStatus = false;
      localStorage.setItem("loginData", JSON.stringify(loginData));
      location.assign("index.html");
    }
  });
function getCurrentLoggedUserIndex(loginArr) {
  for (i in loginArr) {
    //get current user index
    if (loginArr[i].logedStatus == true) {
      return i;
    }
  }
  return false;
}
//on clicking login button
document.getElementById("login-logout-click").addEventListener("click", () => {
  let bool = localStorage.getItem("loginFormStatus");
  bool = bool == "false" ? true : false;
  if (
    bool &&
    document.getElementById("login-logout-text").innerText == "Login"
  ) {
    location.assign("login.html");
  } else {
    document.getElementById("login-logout-text").innerText = "Login";
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    let currentUserIndex = getCurrentLoggedUserIndex(loginData.loginArr);
    loginData.loginArr[currentUserIndex].logedStatus = false;
    localStorage.setItem("loginData", JSON.stringify(loginData));
    location.assign("index.html");
  }
});
