//  rm showSearchResult
//  rm showSearchResultContent

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
  location.href = "searchPage.html";
}

// ************************   show mobile search bar  *****************************
function showSearchBar() {
  let searchBar = document.getElementById("mobile-search-bar");
  searchBar.classList.toggle("show-mobile-search-bar");
}

// show total item in cart
totalItemInCart();
function totalItemInCart() {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  document.getElementById("item-counter").innerHTML = cartData.cartArr.length;
  document.getElementById("total-cart-price").innerHTML =
    cartData.cartArr.length * 999;
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
  location.assign("loginPage.html");
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
      location.assign("loginPage.html");
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
    location.assign("loginPage.html");
  } else {
    document.getElementById("login-logout-text").innerText = "Login";
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    let currentUserIndex = getCurrentLoggedUserIndex(loginData.loginArr);
    loginData.loginArr[currentUserIndex].logedStatus = false;
    localStorage.setItem("loginData", JSON.stringify(loginData));
    location.assign("index.html");
  }
});
// add to wishlist
function addToWishList(productId) {
  let wishlistData = JSON.parse(localStorage.getItem("wishListData"));
  console.log(productId);
  let wishListArr = wishlistData.wishListArr;
  if (wishListArr.includes(productId)) {
    alert("Item already in wishlist");
  } else {
    wishListArr.push(productId);
    localStorage.setItem("wishListData", JSON.stringify(wishlistData));
    alert("item added into wishlist");
  }
}
