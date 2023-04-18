loadFirstTimeOnBrouser();
function loadFirstTimeOnBrouser() {
  if (!localStorage.getItem("cartData")) {
    let cartData = {
      cartArr: [],
    };
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }
  if (!localStorage.getItem("loginFormStatus")) {
    localStorage.setItem("loginFormStatus", false);
  }

  if (!localStorage.getItem("loginData")) {
    let obj = {
      loginArr: [{}],
    };
    localStorage.setItem("loginData", JSON.stringify(obj));
  }

  if (!localStorage.getItem("wishListData")) {
    let wishListData = {
      wishListArr: [],
    };
    localStorage.setItem("wishListData", JSON.stringify(wishListData));
  }
}
getProductData();
let product;
async function getProductData() {
  let response = await fetch("./script/products.json");
  let responsData = await response.json();
  let data = responsData.productData;

  //get data form url
  let urlPrams = new URLSearchParams(window.location.search);
  let id = urlPrams.get("product");
  product = data.find((item) => {
    return item.id == id;
  });
  showProductPage(product);
}
function showProductPage(product) {
  document.getElementById("current-page-nav").innerHTML =
    "product  &nbsp;&nbsp; " +
    '         <i class="fa-solid fa-arrow-right"></i> &nbsp;&nbsp;   ' +
    product.name;

  document.getElementById("product-name").innerHTML = product.name;

  let image = "";
  for (i = 0; i < 6; i++) {
    image += `<img src=${product.img} alt="product image" >`;
  }
  document.getElementById("product-price").innerHTML = "$1999";
  document.getElementById("product-discounted-price").innerHTML =
    product.discountedPrice;

  document.getElementById("more-product-image").innerHTML = image;
  // document.getElementById("product-main-image").src = "" + product.img + "";
  navigateProductDetails(
    document.getElementById("product-discription"),
    product
  );

  let button = document.getElementById("showMoreButton");
  button.addEventListener("click", () => {
    let elem = document.getElementById("detailText");
    if (button.innerHTML.includes("Show More")) {
      button.innerHTML = '<i class="fa-solid fa-angle-up"></i>' + "Show Less";
      button.style.bottom = "-18px";
      document.getElementsByClassName(
        "detailTextAfter"
      )[0].style.backgroundColor = "transparent";
    } else {
      button.innerHTML =
        '<i class="fa-solid fa-chevron-down"></i>' + "Show More";
      button.style.bottom = "-2px";
      document.getElementsByClassName(
        "detailTextAfter"
      )[0].style.backgroundColor = "#dedddd50";
    }
    elem.classList.toggle("height-90");
  });
  displayProductImage(product);
}
function navigateProductDetails(elem, p = product) {
  document
    .getElementsByClassName("nav-active")[0]
    .classList.remove("nav-active");
  elem.classList.add("nav-active");
  document.getElementById("detailText").innerText = p.discription.join("");
}
function displayProductImage(product) {
  let mainImageContainer = document.getElementById("main-image");
  let container = `<div class="owl-carousel owl1 owl-theme">`;
  container += `
     <div class="item">
          <img src="${product.img}" alt="product image"  >
      </div>`;
  if (window.innerWidth <= 712)
    for (i in product.otherImage) {
      container += `
     <div class="item">
          <img src="${product.otherImage}" alt="product image">
      </div>`;
    }
  container += `</div>`;
  mainImageContainer.innerHTML = container;
  owl1();
}
window.addEventListener("resize", () => {
  displayProductImage(product);
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
      },
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
    location.href = "search.html" + "?" + "query=" + inputValue;
  }
}

// ******************************** add to cart   ************************
function addToCart(productId, img, name) {
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
    totalItemInCart();
    document.getElementsByClassName("added-to-cart-modal")[0].style.display =
      "block";
    showItemAddedToCartModal(img, name);
    setTimeout(() => {
      document.getElementsByClassName("added-to-cart-modal")[0].innerHTML = ``;
      document.getElementsByClassName("added-to-cart-modal")[0].style.display =
        "none";
    }, 3000);
  }
}
function showItemAddedToCartModal(img, name) {
  document.getElementsByClassName("added-to-cart-modal")[0].innerHTML += `
        <div style='position:relative;'>
        <i
        class="fa-solid fa-xmark cross-item-added-to-cart"
           onclick="hideItemAdded(event)"
        ></i>
        <div class="added-to-cart-modal-top">
          <img src="${img}" alt="" />
          <div>
            <p id="product-name">${name}</p>
            <p>Success: You have added</p>
            <p>
              ${name} <span>to your <a href=""> shopping cart</a>!</span>
            </p>
          </div>
        </div>
        <div class="view-checkout-button-container">
          <a href="./shoppingCart.html">
            <i class="fa-solid fa-cart-shopping"></i> &nbsp; VIEW CART
          </a>
          <a>
            CHECKOUT &nbsp; <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        </div>
   `;
}
function hideItemAdded(event) {
  console.log(event.target.parentNode);
  event.target.parentNode.style.display = "none";
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

function owl6() {
  $(".owl6").owlCarousel({
    //for display Most Viewed
    loop: true,
    margin: 25,
    nav: false,
    // autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1100: {
        items: 4,
      },
    },
  });
}

displayMostViewed();
async function displayMostViewed() {
  let container = document.getElementById("most-viewed");
  let elem = `<div class="owl-carousel owl6 owl-theme">
  `;
  let response = await fetch("./script/mostViewed.json");
  let responsData = await response.json();
  let data = responsData.mostViewed;
  for (i in data) {
    elem += `
    <div class="item">
              <div class="card">
                <img src="${data[i].img}" alt="" />
                <div>
                  <h2>${data[i].name}</h2>
                  <p>${data[i].prise}</p>
                  <div class="icon-container">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                  </div>
                </div>
              </div>
            </div>
    `;
  }
  elem += `</div>`;
  container.innerHTML = elem;
  owl6();
}

displayfeaturedCategories();
async function displayfeaturedCategories() {
  let response = await fetch("./script/products.json");
  let responsData = await response.json();
  let data = responsData.productData;
  let whyBuyContainer = document.getElementById("related-products");
  let container = ` <div class="owl-carousel owl3 owl-theme">`;
  let count = 0;
  for (i in data) {
    if (data[i].category === "featuredCategories") {
      count++;

      container += `
     <div class="item">
     <div class="featured-products-card">
         <div class="image-container" onclick="showProduct(${data[i].id})">
             <img src="${data[i].img}" alt="">

             <div class="labels">
                      <div class="cross-labels">
                      `;
      for (k in data[i].crossLabel) {
        container += `                 
                           <p class="red-bg">
                               <strong>${data[i].crossLabel[k]}</strong>
                           </p>                  
                       `;
      }
      container += `
                      </div>
                      <div class="right-labels">
                      `;
      for (j in data[i].rightLabels) {
        if (j % 2 == 0) {
          container += `
                            <p class="blue-bg ">
                              <strong>${data[i].rightLabels[j]}</strong>
                           </p>
                            `;
        } else {
          container += `
                            <p class="yellow-bg ">
                              <strong>${data[i].rightLabels[j]}</strong>
                           </p>
                            `;
        }
      }
      container += `            
                       </div>
             </div>
         </div>
         <div class="cart-container">
             <h2>${data[i].name}</h2>
             <p class="price">${data[i].discountedPrice} </p>
             <hr class="related-products-hr">
             <div class="add-to-cart-container">
                 <div>
                     <input type="button" onclick="addToCart(${data[i].id},'${data[i].img}','${data[i].name}')" value="ADD TO CART">
                 </div>
                 <div>
                     <i style="font-weight:100" class="fa-solid fa-heart" onclick="addToWishList(${data[i].id})"></i>
                     <i class="fa-solid fa-arrow-right-arrow-left"></i>
                 </div>
             </div>
         </div>
     </div>
 </div>
      `;
    }
  }
  container += `</div>`;
  whyBuyContainer.innerHTML = container;
  owl3();
}
function owl3() {
  $(".owl3").owlCarousel({
    //for display featured Categories
    loop: true,
    margin: 10,
    nav: false,
    // autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 2,
      },
      700: {
        items: 1,
      },
      850: {
        items: 2,
      },
      1246: {
        items: 3,
      },
      1400: {
        items: 4,
      },
    },
  });
}
// ************************   show search Result  **********************************
document.getElementById("searchButton").addEventListener("click", () => {
  showSearchResult();
});
document.getElementById("mobileSearchButton").addEventListener("click", () => {
  showSearchResult();
});

//zoom image on mouse hover
function zoomImage(elem) {
  elem.style.transform = "scale(1.17)";
  elem.style.transition = ".3s ease-in-out";
}
function unZoomImage(elem) {
  elem.style.transform = "scale(1)";
}
function zoomShopByBrandImage(elem) {
  zoomImage(elem);
}
function unZoomShopByBrandImage(elem) {
  unZoomImage(elem);
}
// nov menu on hover
function displayNavSubMenuContent() {
  let targetElem = document.querySelector("#on-hover-department-nav-sub-menu");
  document.querySelector("#on-hover-department").style.display = "block";
  targetElem.style.display = "flex";
}
function hideNavSubMenuContent() {
  let targetElem = document.querySelector("#on-hover-department-nav-sub-menu");
  document.querySelector("#on-hover-department").style.display = "none";
  targetElem.style.display = "none";
}
function displayOnHoverSubMenuContent(elem) {
  elem.target.style.display = "flex";
  document.querySelector("#on-hover-department").style.display = "block";
}
function hideOnHoverSubMenuContent(elem) {
  document.querySelector("#on-hover-department").style.display = "none";
  elem.target.style.display = "none";
}
// show product
function showProduct(id) {
  location.href = "product.html" + "?" + "product=" + id;
}
