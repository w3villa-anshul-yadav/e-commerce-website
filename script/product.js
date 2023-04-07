let product = JSON.parse(localStorage.getItem("product"));
document.getElementById("current-page-nav").innerHTML =
  "search  &nbsp;&nbsp; " +
  '         <i class="fa-solid fa-arrow-right"></i> &nbsp;&nbsp;   ' +
  product.name;

document.getElementById("product-name").innerHTML = product.name;

let image = "";
product.otherImage.forEach((element) => {
  image += `<img src=${element} alt="product image" >`;
});

document.getElementById("more-product-image").innerHTML = image;
// document.getElementById("product-main-image").src = "" + product.img + "";

navigateProductDetails(document.getElementById("product-discription"));
function navigateProductDetails(elem) {
  document
    .getElementsByClassName("nav-active")[0]
    .classList.remove("nav-active");
  elem.classList.add("nav-active");
  document.getElementById("detailText").innerText =
    product.discription.join("");
}

let button = document.getElementById("showMoreButton");
button.addEventListener("click", () => {
  let elem = document.getElementById("detailText");
  if (button.innerHTML.includes("Show More")) {
    button.innerHTML = '<i class="fa-solid fa-angle-up"></i>' + "Show Less";
    button.style.bottom = "-25px";
    document.getElementsByClassName(
      "detailTextAfter"
    )[0].style.backgroundColor = "transparent";
  } else {
    button.innerHTML = '<i class="fa-solid fa-chevron-down"></i>' + "Show More";
    button.style.bottom = "-2px";
    document.getElementsByClassName(
      "detailTextAfter"
    )[0].style.backgroundColor = "#dedddd50";
  }
  elem.classList.toggle("height-90");
});

displayProduct();
function displayProduct(){
  let mainImageContainer = document.getElementById("main-image");
  let container = ` <div class="owl-carousel owl1 owl-theme">`;
  container += `
     <div class="item">
          <img src="${product.img}" alt="product image">
           
      </div>`;
       if(window.innerWidth<=712)
  for (i in product.otherImage) {
    container += `
     <div class="item">
          <img src="${product.otherImage[i]}" alt="product image">
           
      </div>`;
  }
  container += `</div>`;
  mainImageContainer.innerHTML=container;
  owl1();
}
window.addEventListener("resize", () => {
  displayProduct();
});
function owl1() {
  //for  display Why Buy Us
  $(".owl1").owlCarousel({
    loop: true,
    margin: 15,
    nav: false,
    // autoplay: true,
    responsive: {
      0: {
        items: 1,
      }
    },
  });
}


// common script

totalItemInCart();
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
  if (!(inputValue.trim() == "")) {
    localStorage.setItem("searchValue", inputValue);
    location.href = "search.html";
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

// ************************   show mobile search bar  *****************************
function showSearchBar() {
  let searchBar = document.getElementById("mobile-search-bar");
  searchBar.classList.toggle("show-mobile-search-bar");
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

function totalItemInCart() {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  document.getElementById("item-counter").innerHTML = cartData.cartArr.length;
  document.getElementById("total-cart-price").innerText =
    cartData.cartArr.length * 999;
}
// on clicking register button
function signUpForm() {
  localStorage.setItem("loginFormStatus", true);
  location.assign("login.html");
}
loadSignUp();
function loadSignUp() {
  let bool = localStorage.getItem("loginFormStatus");
  bool = bool == "true" ? true : false;
  if (bool) {
    showSignUp(document.getElementById("signup-button"));
  }
  setTimeout(() => {
    localStorage.setItem("loginFormStatus", false);
  }, 500);
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
// add to wishlist
function addToWishList(productId) {
  let wishlistData = JSON.parse(localStorage.getItem("wishListData"));
  let wishListArr = wishlistData.wishListArr;
  if (wishListArr.includes(productId)) {
    alert("Item already in wishlist");
  } else {
    wishListArr.push(productId);
    localStorage.setItem("wishListData", JSON.stringify(wishlistData));
    alert("item added into wishlist");
  }
}
