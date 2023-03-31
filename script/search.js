// *********************show search result on this page ******************
showResult(localStorage.getItem("searchValue"));
// localStorage.setItem("searchValue","");
// ************************   show search Result  **********************************
document.getElementById("searchButton").addEventListener("click", () => {
  showSearchResult();
});
document.getElementById("mobileSearchButton").addEventListener("click", () => {
  showSearchResult();
});
document
  .getElementById("search-button-search-page")
  .addEventListener("click", () => {
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
  if (inputValue == "") {
    inputValue = document.getElementById("search-value").value;
  }

  localStorage.setItem("searchValue", inputValue);
  location.href = "search.html";
}
async function showResult(inputValue) {
  let whyBuyContainer = document.getElementById("searchCard");
  //display search heading on search page
  document.getElementById("search-value-heading").innerHTML = inputValue;
  document.getElementById("search-value").value = inputValue;
  let container = ` <div class="search-result" >`;
  let notFound = true;
  let noOfPages;
  let resultArr = [];
  let i = 0;

  if (inputValue.trim().length == 0) {
    container += `<h1 style='color:red'> Input Required</h1>`;
    notFound = false;
  } else {
    let response = await fetch("./script/products.json");
    let responsData = await response.json();
    let data = responsData.productData;
    for (let k in data) {
      if (
        data[k].name.toUpperCase().includes(inputValue.toUpperCase()) &&
        data[k].category === "featuredCategories"
      ) {
        resultArr.push(data[k]);
        notFound = false;
      }
    }
    noOfPages = Math.ceil(resultArr.length / 3);
    for (i = 0; i < resultArr.length; i++) {
      if (i >= 3) break;
      container += showSearchResultContent(resultArr[i]);
    }
    try {
      showPagination(noOfPages, resultArr);
    } catch (err) {}
  }
  if (notFound) {
    container += `<h1 style='color:red'> NO Result Found</h1>`;
  }
  container += `</div>`;

  whyBuyContainer.innerHTML = container;
  if (i == resultArr.length) {
    whyBuyContainer.innerHTML += ` <h2 style="text-align:center">You have reached the end of the list</h2>`;
  }
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
function displayListViewSearch() {
  if (window.innerWidth <= 580) {
    displayGridViewSearch();
  } else {
    let toggleListArray = document.getElementsByClassName("toggle-list-view");

    for (let i = 0; i < toggleListArray.length; i++) {
      toggleListArray[i].style["display"] = "flex";
      toggleListArray[i].style.width = "100%";
      toggleListArray[i].style.background = "inherit";
    }

    let imageContainer = document.getElementsByClassName("image-container");
    for (let i = 0; i < imageContainer.length; i++) {
      imageContainer[i].classList.add("list-image-container");
    }
    let gridViewArray = document.getElementsByClassName(
      "grid-view-brand-model"
    );
    for (let i = 0; i < gridViewArray.length; i++) {
      gridViewArray[i].style["display"] = "none";
    }

    let listViewArray = document.getElementsByClassName(
      "list-view-brand-model"
    );
    for (let i = 0; i < listViewArray.length; i++) {
      listViewArray[i].style["display"] = "block";
    }

    document.getElementsByClassName("search-result")[0].style["display"] =
      "block";
  }
}
function displayGridViewSearch() {
  let toggleListArray = document.getElementsByClassName("toggle-list-view");

  for (let i = 0; i < toggleListArray.length; i++) {
    toggleListArray[i].style["display"] = "block";
    toggleListArray[i].style.width = "330px";
  }

  let imageContainer = document.getElementsByClassName("image-container");
  for (let i = 0; i < imageContainer.length; i++) {
    imageContainer[i].classList.remove("list-image-container");
  }
  let gridViewArray = document.getElementsByClassName("grid-view-brand-model");
  for (let i = 0; i < gridViewArray.length; i++) {
    gridViewArray[i].style["display"] = "block";
  }

  let listViewArray = document.getElementsByClassName("list-view-brand-model");
  for (let i = 0; i < listViewArray.length; i++) {
    listViewArray[i].style["display"] = "none";
  }

  document.getElementsByClassName("search-result")[0].style["display"] = "flex";
}
window.addEventListener("resize", (event) => {
  if (window.innerWidth <= 580) {
    displayGridViewSearch();
  }
});

document.getElementById("view-list").addEventListener("click", () => {
  displayListViewSearch();
});
document.getElementById("view-grid").addEventListener("click", () => {
  displayGridViewSearch();
});
function showSearchResultContent(data) {
  let container = ``;
  container += `         <div class="item">
                        <div class="featured-products-card toggle-list-view" >
                            <div class="image-container">
                                <img src="${data.img}" alt=""> 
                                <div class="labels">
                                <div class="cross-labels">
                          `;
  for (k in data.crossLabel) {
    container += `  
                                <p class="red-bg">
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
                      <div class="grid-view-brand-model">
                      <div class="brand-model">
                          <a >
                              <p>${data.brand[0]}</p>
                          </a>
                          <p>${data.brand[1]}</p>
                      </div>
                      <div class="cart-container">
                          <h2>${data.name}</h2>
                        
                          <p class="price">${data.discountedPrice} <span><del>${data.price}</del></span></p>
                          <div class="add-to-cart-container">
                              <div>
                                  <input type="number" id="${data.id}-no-of-item" value="1">
                                  <input type="button" id="${data.id}" onclick="addToCart(${data.id})" value="ADD TO CART">
                              </div>
                              <div>
                                  <i style="font-weight:100" class="fa-solid fa-heart" onclick="addToWishList(${data.id})"></i>
                                  <i class="fa-solid fa-arrow-right-arrow-left"></i>
                              </div>
                          </div>
                      </div>
                      <div class="buy-now-question-container ">
                          <div>
                              <i class="fa-solid fa-dollar-sign"></i>
                              <p>Buy Now</p>
                          </div>
                          <div>
                              <i class="fa-solid fa-question"></i>
                              <p>Question</p>
                          </div>
                      </div>
                      </div>

      <div class="list-view-brand-model">
      <div class="list-brand-model">
        <a>
          <p>Brand: <span style="color:blue"> <u> ${data.brand[0]}</u></span></p>
        </a>
        <p>Model: <a>${data.brand[1]}</a></p>
      </div>
      <div class="cart-container">
        <h2>${data.name}</h2>
        <p  >${data.discription}</p>
        <p class="price">
          ${data.discountedPrice} <span style=" color:black  ; font-size:12px " ><del   >${data.price}</del></span>
        </p>
        <div class="list-add-to-cart-container">
          <div>
            <input type="number" id="${data.id}-no-of-item" value="1" />
            <input
              type="button"
              id="${data.id}"
              onclick="addToCart(${data.id})"
              value="ADD TO CART"
            />
          </div>
          <div>
            <i
              style="font-weight: 100"
              class="fa-solid fa-heart"
              onclick="addToWishList(${data.id})"
            ></i>
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
        </div>
      </div>
      <div class="list-buy-now-question-container">
        <div>
          <i class="fa-solid fa-dollar-sign"></i>
          <p>Buy Now</p>
        </div>
        <div>
          <i class="fa-solid fa-question"></i>
          <p>Question</p>
        </div>
      </div>
    </div>

                  </div>
                  </div>
                  <hr style="margin-bottom:30px">
                  `;
  return container;
}
//on clicking pagination
function handlePagination(resultArr) {
  document.getElementById("paginationHandler").childNodes.forEach((elem) => {
    elem.addEventListener("click", () => {
      let innerValue = parseInt(elem.innerText);

      let start = (innerValue - 1) * 3;
      let end = start + 3 - 1;
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
      if (start == resultArr.length) {
        whyBuyContainer.innerHTML += ` <h2 style="text-align:center">You have reached the end of the list</h2>`;
      }
    });
  });
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
// show current page title on current NAV BAR
document.getElementById("current-page-title").innerHTML = document.title;

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
function owl6() {
  $(".owl6").owlCarousel({
    //for display Most Viewed
    loop: true,
    margin: 25,
    nav: false,
    autoplay: true,
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
//on clicking side panel
document.getElementById("toggle-price-button").addEventListener("click", () => {
  document
    .getElementById("toggle-price-button")
    .classList.toggle("toggle-c-white");
  document
    .getElementById("price-range-toggle")
    .classList.toggle("toggle-height");
  document.getElementById("price-toggle-icon").classList.toggle("fa-plus");
});

document
  .getElementById("toggle-availability-button")
  .addEventListener("click", () => {
    document
      .getElementById("toggle-availability-button")
      .classList.toggle("toggle-c-white");
    document
      .getElementById("availability-toggle")
      .classList.toggle("toggle-height");

    document
      .getElementById("toggle-availability-icon")
      .classList.toggle("fa-plus");
  });

document
  .getElementById("toggle-subcategories-button")
  .addEventListener("click", () => {
    document
      .getElementById("toggle-subcategories-button")
      .classList.toggle("toggle-c-white");
    document
      .getElementById("subcategories-toggle")
      .classList.toggle("toggle-height");

    document
      .getElementById("toggle-subcategories-icon")
      .classList.toggle("fa-plus");
  });

document
  .getElementById("toggle-brands-button")
  .addEventListener("click", () => {
    document
      .getElementById("toggle-brands-button")
      .classList.toggle("toggle-c-white");
    document.getElementById("brands-toggle").classList.toggle("toggle-height");

    document.getElementById("toggle-brands-icon").classList.toggle("fa-plus");
  });

document
  .getElementById("toggle-select-button")
  .addEventListener("click", () => {
    document
      .getElementById("toggle-select-button")
      .classList.toggle("toggle-c-white");
    document.getElementById("select-toggle").classList.toggle("toggle-height");

    document.getElementById("toggle-select-icon").classList.toggle("fa-plus");
  });

document.getElementById("toggle-radio-button").addEventListener("click", () => {
  document
    .getElementById("toggle-radio-button")
    .classList.toggle("toggle-c-white");
  document.getElementById("radio-toggle").classList.toggle("toggle-height");

  document.getElementById("toggle-radio-icon").classList.toggle("fa-plus");
});

document.getElementById("toggle-color-button").addEventListener("click", () => {
  document
    .getElementById("toggle-color-button")
    .classList.toggle("toggle-c-white");
  document.getElementById("color-toggle").classList.toggle("toggle-height");

  document.getElementById("toggle-color-icon").classList.toggle("fa-plus");
});

document
  .getElementById("toggle-clockspeed-button")
  .addEventListener("click", () => {
    document
      .getElementById("toggle-clockspeed-button")
      .classList.toggle("toggle-c-white");
    document
      .getElementById("clockspeed-toggle")
      .classList.toggle("toggle-height");

    document
      .getElementById("toggle-clockspeed-icon")
      .classList.toggle("fa-plus");
  });

document.getElementById("toggle-test1-button").addEventListener("click", () => {
  document
    .getElementById("toggle-test1-button")
    .classList.toggle("toggle-c-white");
  document.getElementById("test1-toggle").classList.toggle("toggle-height");

  document.getElementById("toggle-test1-icon").classList.toggle("fa-plus");
});

document
  .getElementById("toggle-noofcores-button")
  .addEventListener("click", () => {
    document
      .getElementById("toggle-noofcores-button")
      .classList.toggle("toggle-c-white");
    document
      .getElementById("noofcores-toggle")
      .classList.toggle("toggle-height");

    document
      .getElementById("toggle-noofcores-icon")
      .classList.toggle("fa-plus");
  });

document.getElementById("toggle-style-button").addEventListener("click", () => {
  document
    .getElementById("toggle-style-button")
    .classList.toggle("toggle-c-white");
  document.getElementById("style-toggle").classList.toggle("toggle-height");

  document.getElementById("toggle-style-icon").classList.toggle("fa-plus");
});

// display two way  range input on search page
showInputRangeOnPriseInput();
function showInputRangeOnPriseInput() {
  document.getElementById("minInput").value =
    document.getElementById("min").value;
  document.getElementById("maxInput").value =
    document.getElementById("max").value;
}
