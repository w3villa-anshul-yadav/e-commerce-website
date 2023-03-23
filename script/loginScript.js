totalItemInCart();
// ************************   show search Result in page  ******************************
function showSearchResult() {
  let inputValue;
  if (window.innerWidth > 1272) {
    inputValue = document.getElementById("searchInput").value;
  } else {
    inputValue = document.getElementById("mobileSearchInput").value;
  }
  let SearchResultContainer = document.getElementById("searchResult");
  SearchResultContainer.style.display = "block";
  document.getElementsByTagName("main")[0].classList.add("display-none");
  showResult(inputValue);
}
async function showResult(inputValue) {
  let response = await fetch("./script/products.json");
  let responsData = await response.json();
  let data = responsData.productData;
  let whyBuyContainer = document.getElementById("searchCard");
  let container = ` <div class="search-result" >`;
  let flag = true;
  for (i in data) {
    if (
      data[i].name.toUpperCase().includes(inputValue.toUpperCase()) &&
      data[i].category === "featuredCategories"
    ) {
      flag = false;
      if (inputValue.length == 00) {
        container += `<h1 style='color:red'> Input Required</h1>`;
        break;
      }
      container += `
          <div class="item">
          <div class="featured-products-card" id="searchItem">
              <div class="image-container">
                  <img src="${data[i].img}" alt="">

                  <div class="labels">
                           <div class="cross-labels">
                           `;
      for (k in data[i].crossLabel) {
        container += `
                                <p class="blue-bg">
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
                                 <p class="yellow-bg ">
                                   <strong>${data[i].rightLabels[j]}</strong>
                                </p>
                                 `;
        } else {
          container += `
                                 <p class="red-bg ">
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
                  <hr>
                  <div class="add-to-cart-container">
                      <div>
                          <input type="button" onclick="addToCart(${data[i].id})"value="ADD TO CART">
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
  if (flag == true) {
    container += `<h1 style='color:red'> NO Result Found</h1>`;
  }
  container += `</div>`;
  whyBuyContainer.innerHTML = container;
}
// ************************   show mobile search bar  *****************************
function showSearchBar() {
  let searchBar = document.getElementById("mobile-search-bar");
  searchBar.classList.toggle("show-mobile-search-bar");
}
// *************   show hide navbar item sale and new container**********************
var bottomNavbar = document.getElementById("fixed-bottom-navbar");
var topPos = bottomNavbar.offsetTop;
window.onscroll=function(){
  showHIdeNav();
}
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
// onClicking register button in navbar
function signUpForm() {
  localStorage.setItem("loginFormStatus", true);
  location.assign("loginPage.html");
}

// signup page on click
function showSignUp(elem) {
  let passwordContainer = document.getElementById("password-container");
  let loginButton = document.getElementById("login");
  if (elem.innerHTML == "Sign Up") {
    passwordContainer.insertAdjacentHTML(
      "afterend",
      `
          <div class="confirm-password">
             <i class="fa-solid fa-lock"></i>
             <input
                     type="password"
                     autocomplete="off"
                     required=""
                     placeholder="Confirm Password"
                     id="confirm-password"
                     />
                     </div>
                     `
    );
    elem.innerHTML = "Log In";
    loginButton.value = "SIGN UP";
  } else {
    let confirmPassword = document
      .getElementsByClassName("confirm-password")[0]
      .remove();
    elem.innerHTML = "Sign Up";
    loginButton.value = "LOG IN";
  }
}

//signup
document.getElementById("login").addEventListener("click", function () {
  if (this.value == "LOG IN") logIn();
  else signUp();
});
function signUp() {
  var userName = document.getElementById("user-name").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;
  if (password != confirmPassword) {
    alert("password are not same");
  } else {
    let loginObj;
    if (userName.length != 0 && password.length != 0) {
      loginObj = {
        username: userName,
        password: password,
        logedStatus: false,
      };
    } else {
      alert("input required");
    }
    if (localStorage.getItem("loginData")) {
      try {
        let loginData = JSON.parse(localStorage.getItem("loginData"));
        loginData.loginArr.push(loginObj);
        localStorage.setItem("loginData", JSON.stringify(loginData));
        alert("Your account has been created");
        location.assign("loginPage.html");
      } catch (err) {
        location.assign("loginPage.html");
      }
    } else {
      let obj = {
        loginArr: [loginObj],
      };
      localStorage.setItem("loginData", JSON.stringify(obj));
      alert("Your account has been created");
      location.assign("loginPage.html");
    }
  }
}

//login check
function logIn() {
  let loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData) {
    var userName = document.getElementById("user-name");
    var userPassword = document.getElementById("password");
    let flag = false;
    for (i in loginData.loginArr) {
      if (userName.value.length != 0 && password.value.length != 0) {
        if (
          userName.value == loginData.loginArr[i].username &&
          userPassword.value == loginData.loginArr[i].password
        ) {
          loginData.loginArr[i].logedStatus = true;
          localStorage.setItem("loginData", JSON.stringify(loginData));
          flag = true;
        }
      } else {
        alert("input requied");
        break;
      }
    }
    if (flag) {
      location.assign("index.html");
    } else {
      alert("password did not matched");
    }
  } else {
    alert("invalid user id & password");
  }
}
totalItemInCart();
function totalItemInCart() {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  document.getElementById("item-counter").innerHTML = cartData.cartArr.length;
}
// on clicking register button
function signUpForm() {
  localStorage.setItem("loginFormStatus", true);
  location.assign("loginPage.html");
}
 
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

function totalItemInCart() {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  document.getElementById("item-counter").innerHTML = cartData.cartArr.length;
}
 
 
//on clicking login button
document.getElementById("login-logout-click").addEventListener("click", () => {
  if (document.getElementById("login-logout-text").innerText == "Login") {
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
  let SearchResultContainer = document.getElementById("searchResult");
  SearchResultContainer.style.display = "block";
  document.getElementsByTagName("main")[0].classList.add("display-none");
  showResult(inputValue);
}
async function showResult(inputValue) {
  let whyBuyContainer = document.getElementById("searchCard");
  let container = ` <div class="search-result" >`;
  let notFound = true;
  let noOfPages;
  let resultArr = [];
  if (inputValue.trim().length == 0) {
    container += `<h1 style='color:red'> Input Required</h1>`;
    notFound = false;
  } else {
    let response = await fetch("./script/products.json");
    let responsData = await response.json();
    let data = responsData.productData;
    for (i in data) {
      if (
        data[i].name.toUpperCase().includes(inputValue.toUpperCase()) &&
        data[i].category === "featuredCategories"
      ) {
        resultArr.push(data[i]);
        notFound = false;
      }
    }
    noOfPages = Math.ceil(resultArr.length / 4);
    for (let i = 0; i < resultArr.length; i++) {
      if (i >= 4) break;
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
                         <i style="font-weight:100" class="fa-solid fa-heart" onclick="addToWishList(${data.id})"></i>
                         <i class="fa-solid fa-arrow-right-arrow-left"></i>
                         </div>
                         </div>
                     </div>
                 </div>
                 </div>
                 `;
  return container;
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
  let SearchResultContainer = document.getElementById("searchResult");
  SearchResultContainer.style.display = "block";
  document.getElementsByTagName("main")[0].classList.add("display-none");
  showResult(inputValue);
}
async function showResult(inputValue) {
  let whyBuyContainer = document.getElementById("searchCard");
  let container = ` <div class="search-result" >`;
  let notFound = true;
  let noOfPages;
  let resultArr = [];
  if (inputValue.trim().length == 0) {
    container += `<h1 style='color:red'> Input Required</h1>`;
    notFound = false;
  } else {
    let response = await fetch("./script/products.json");
    let responsData = await response.json();
    let data = responsData.productData;
    for (i in data) {
      if (
        data[i].name.toUpperCase().includes(inputValue.toUpperCase()) &&
        data[i].category === "featuredCategories"
      ) {
        resultArr.push(data[i]);
        notFound = false;
      }
    }
    noOfPages = Math.ceil(resultArr.length / 4);
    for (let i = 0; i < resultArr.length; i++) {
      if (i >= 4) break;
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
             <i style="font-weight:100" class="fa-solid fa-heart" onclick="addToWishList(${data.id})"></i>
             <i class="fa-solid fa-arrow-right-arrow-left"></i>
             </div>
             </div>
         </div>
     </div>
     </div>
     `;
  return container;
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
//******************sell all button************************************/
function seeAllProducts() {
  location.assign("allProducts.html");
}
// ************************   show mobile search bar  *****************************
function showSearchBar() {
  let searchBar = document.getElementById("mobile-search-bar");
  searchBar.classList.toggle("show-mobile-search-bar");
}

totalItemInCart();
function totalItemInCart() {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  document.getElementById("item-counter").innerHTML = cartData.cartArr.length;
  document.getElementById("total-cart-price").innerText =
    cartData.cartArr.length * 999;
}
// on clicking register button
function signUpForm() {
  localStorage.setItem("loginFormStatus", true);
  location.assign("loginPage.html");
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
}//on clicking login button for mobile nav 
document.getElementById("login-logout-click-mobile").addEventListener("click", () => {
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
  let wishListArr= wishlistData.wishListArr;
  if(wishListArr.includes(productId)){
    alert("Item already in wishlist")
  }else{
  wishListArr.push(productId);
  localStorage.setItem("wishListData",JSON.stringify(wishlistData));
  alert("item added into wishlist");
  }
}
