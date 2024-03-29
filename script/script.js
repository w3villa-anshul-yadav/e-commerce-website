loadFirstTimeOnBrouser();
setCurrentUser();
totalItemInCart();
// on clicking register button
function signUpForm() {
  localStorage.setItem("loginFormStatus", true);
  location.assign("login.html");
}

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
// display current user name text

function setCurrentUser() {
  let loginData = JSON.parse(localStorage.getItem("loginData"));
  let userIndx = getCurrentLoggedUserIndex(loginData.loginArr);
  if (userIndx) {
    let username = loginData.loginArr[userIndx].username;
    document.getElementById("currentUser").innerHTML = username.toUpperCase();

    document.getElementById("currentUser").style.color = "blue";
    document.getElementById("login-logout-text").innerText = "Log Out";
    document.getElementById("login-logout-text-mobile").innerText = "Log Out";
  } else {
    document.getElementById("currentUser").innerHTML = "";
    // document.getElementById("currentUser-mobile").innerHTML = "";
    document.getElementById("login-logout-text").innerText = "Login";
    document.getElementById("login-logout-text-mobile").innerText = "Login";
  }
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
//on clicking login button for mobile nav
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

// ************************   owl Carousel **********************************
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
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1246: {
        items: 4,
      },
      1400: {
        items: 5,
      },
    },
  });
}
function owl2() {
  $(".owl2").owlCarousel({
    // for display featured Products
    loop: true,
    margin: 23,
    nav: false,
    // autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1250: {
        items: 4,
      },
    },
  });
}

function owl3() {
  $(".owl3").owlCarousel({
    //for display featured Categories
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
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
function owl4() {
  $(".owl4").owlCarousel({
    //for shop  by brand
    loop: true,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      440: {
        items: 3,
      },
      630: {
        items: 4,
      },
      740: {
        items: 5,
      },
      950: {
        items: 6,
      },
      1190: {
        items: 7,
      },
      1380: {
        items: 8,
      },
      1490: {
        items: 9,
      },
    },
  });
}
function owl5() {
  $(".owl5").owlCarousel({
    //for display Our Blog
    loop: true,
    margin: 25,
    nav: false,
    // autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      674: {
        items: 2,
      },
      1040: {
        items: 3,
      },
    },
  });
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
// ************************   category toggle buttons  **********************************

function toggleWhyBuyCategories(elem) {
  let activElem = document.getElementsByClassName("active-why-buy")[0];
  activElem.classList.remove("active-why-buy");
  elem.classList.add("active-why-buy");
  displayWhyBuyUs(elem.innerHTML.trim());
}
function toggleBlogCategories(elem) {
  let activElem = document.getElementsByClassName("active-blog")[0];
  activElem.classList.remove("active-blog");
  elem.classList.add("active-blog");
  displayOurBlog(elem.innerHTML.trim());
}
function toggleFeaturedCategories(elem) {
  let activElem = document.getElementsByClassName("active-featured")[0];
  activElem.classList.remove("active-featured");
  elem.classList.add("active-featured");
  displayfeaturedProducts(elem.innerHTML.trim());
}
// ************************   go to top button  **********************************
let mybutton = document.getElementsByClassName("top-navigation-controller")[0];
window.onscroll = function () {
  showHIdeNav();
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "inline-block";
  } else {
    mybutton.style.display = "none";
  }
}
// ****** fetch data from json file and render in document *************
displayWhyBuyUs("top categories");
async function displayWhyBuyUs(elem) {
  let response = await fetch("./script/whyBuyFromUs.json");
  let responsData = await response.json();
  let data;
  switch (elem) {
    case "top categories":
      data = responsData.top_categories;
      break;
    case "electronics":
      data = responsData.electronics;
      break;
    case "beauty":
      data = responsData.beauty;
      break;
    case "fashiion":
      data = responsData.fashiion;
      break;
  }
  let whyBuyContainer = document.getElementById("why-buy");
  let container = ` <div class="owl-carousel owl1 owl-theme">`;
  for (i in data) {
    container += `
     <div class="item">
          <img src="${data[i].img}" onmouseleave="unZoomImage(this)" onmouseenter="zoomImage(this)"  alt="">
          <div class="text-on-image">
              <p>${data[i].name}</p>
          </div>
      </div>`;
  }
  container += `</div>`;
  whyBuyContainer.innerHTML = container;
  owl1();
}
displayfeaturedProducts("featured");
async function displayfeaturedProducts(elem) {
  let response = await fetch("./script/products.json");
  let responsData = await response.json();
  let data = responsData.productData;
  let whyBuyContainer = document.getElementById("featured-products");
  let container = ` 
                <div class="owl-carousel owl2 owl-theme">`;
  for (i in data) {
    if (data[i].category === elem) {
      container += `
                        <div class="item">
                        <div class="featured-products-card">
                            <div class="image-container" onclick="showProduct(${data[i].id})">
                                <img src="${data[i].img}" onmouseleave="unZoomImage(this)" onmouseenter="zoomImage(this)" alt=""> 
                                <div class="zoom-icon">
                               
                                      <i class="fa-solid fa-magnifying-glass-plus"></i>
                                </div>
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
                      <div class="brand-model">
                          <a >
                              <p>${data[i].brand[0]}</p>
                          </a>
                          <p>${data[i].brand[1]}</p>
                      </div>
                      <div class="cart-container">
                          <h2>${data[i].name}</h2>
                          <p class="price">${data[i].discountedPrice} <span><del>${data[i].price}</del></span></p>
                          <div class="add-to-cart-container">
                              <div>
                                  <input type="number" id="${data[i].id}-no-of-item" value="1">
                                  <input type="button" id="${data[i].id}" onclick="addToCart(${data[i].id},'${data[i].img}','${data[i].name}')" value="ADD TO CART">
                              </div>
                              <div>
                                  <i style="font-weight:100" class="fa-solid fa-heart" onclick="addToWishList(${data[i].id})"></i>
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
                </div> 
    `;
    }
  }
  container += `</div>`;
  whyBuyContainer.innerHTML = container;
  owl2();
}
displayfeaturedCategories();
async function displayfeaturedCategories() {
  let response = await fetch("./script/products.json");
  let responsData = await response.json();
  let data = responsData.productData;
  let whyBuyContainer = document.getElementById("featured-category");
  let container = ` <div class="owl-carousel owl3 owl-theme">`;
  for (i in data) {
    if (data[i].category === "featuredCategories") {
      container += `
     <div class="item">
     <div class="featured-products-card">
         <div class="image-container" onclick="showProduct(${data[i].id})">
             <img src="${data[i].img}" onmouseleave="unZoomImage(this)" onmouseenter="zoomImage(this)"  alt="">
               <div class="zoom-icon">
                                
                                      <i class="fa-solid fa-magnifying-glass-plus"></i>
                                </div>
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
             <hr>
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
displayOurBlog("latest posts");
async function displayOurBlog(elem) {
  let response = await fetch("./script/fromOurBlog.json");
  let responsData = await response.json();
  let data;
  switch (elem) {
    case "latest posts":
      data = responsData.latest_posts;
      break;
    case "rated":
      data = responsData.rated;
      break;
  }
  let whyBuyContainer = document.getElementById("our-blog");
  let container = `<div class="owl-carousel owl5 owl-theme">`;
  for (i in data) {
    container += `
  <div class="item">
                    <div class="featured-products-card">
                    <div class="image-container" >
                        <img src="${
                          data[i].img
                        }" alt="" onmouseenter="zoomImage(this)" onmouseleave="unZoomImage(this)"  />
                        <div class="blog-details brand-model">
                        <i class="fa-solid fa-user"></i>
                        <p>${data[i].author}</p>
                        <i class="fa-regular fa-comment-dots"></i>
                        <p>${data[i].noOfComment}</p>
                        <i class="fa-solid fa-eye"></i>
                        <p>${data[i].views}</p>
                    </div>
                        <div class="labels">
                        <div class="left-labels">
                            <p class="blue-bg">
                            <strong>${data[i].date[0]} <br />${
      data[i].date[1]
    }</strong>
                             </p>
                        </div>
                        </div>
                    </div>
                   
                    <div class="blog-paragraph-container">
                        <h3>Journal Blog is Here</h3>
                        <p>
                        ${data[i].blogText.join("")}
                        </p>
                        <a>
                        <p>Read More <i class="fa-solid fa-arrow-right"></i></p>
                        </a>
                    </div>
                    </div>
          </div>
  `;
  }
  container += `</div>`;
  whyBuyContainer.innerHTML = container;
  owl5();
}
displayShopByBrand();
async function displayShopByBrand() {
  let response = await fetch("./script/shopByBrandData.json");
  let responsData = await response.json();
  let data = responsData.shopByBrandData;
  let parentContainer = document.getElementById("shop-by-brand");
  let container = `<div class="owl-carousel owl4 owl-theme">
    `;
  for (i in data) {
    container += `<div class="item" >
      <div class="featured-products-card">
        <div class="image-container"  >
          <a><img src="${data[i].img}" onmouseleave="unZoomShopByBrandImage(this)" onmouseenter="zoomShopByBrandImage(this)"  alt="" />
          <p id="brand-logo-label" style="text-align: center">Apple</p>
          </a>
        </div>
      </div>
    </div>`;
  }
  container += `</div>`;
  parentContainer.innerHTML = container;
  owl4();
}

displayImprovedGallery();
async function displayImprovedGallery() {
  let response = await fetch("./script/improvedGalleryData.json");
  let responsData = await response.json();
  let data = responsData.improvedGalleryData;

  let container = document.getElementById("gallery-container");

  for (i in data) {
    container.innerHTML += `
    <div class="gallary-image">
    <img src="${data[i].img}" alt="gallery image"  onmouseenter="zoomImage(this)" onmouseleave="unZoomImage(this)"   >
     <div class="zoom-icon">
                               
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                                </div>`;
  }
}
displayPeopleSaying();
async function displayPeopleSaying() {
  let container = document.getElementById("people-saying-about-us");
  let elem = `<div class="owl-carousel owl5 owl-theme">
  `;
  let response = await fetch("./script/peopleSaying.json");
  let responsData = await response.json();
  let data = responsData.peopleSaying;
  for (i in data) {
    elem += `
    <div class="item">
    <div class="featured-products-card">
      <p class="quote"><i class="fa-solid fa-quote-left"></i></p>
      <div class="blog-paragraph-container">
        <p>
          ${data[i].text}
        </p>
        <a class="author">
          <p> ${data[i].author}</p>
        </a>
      </div>
    </div>
  </div>
    `;
  }
  elem += `</div>`;
  container.innerHTML = elem;
  owl5();
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
                <img src="${data[i].img}" onmouseenter="zoomImage(this)" onmouseleave="unZoomImage(this)" alt="" />
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
let slideIndex = 1;
displayHeroSlide();
async function displayHeroSlide() {
  let container = document.getElementById("hero-slider");
  let response = await fetch("./script/heroSIlider.json");
  let responsData = await response.json();
  let data = responsData.heroSliderData;
  let elem = ``;
  for (i in data) {
    elem += `
    <div class="mySlides fade">
    <img src="${data[i].img}" style="width: 100%" />
    <div class="text-over-image">
      <input type="button" value="${data[i].value}" />
      <h1>${data[i].text}</h1>
      <div class="learn-more">
        <p>LEARN MORE <strong>&rarr;</strong></p>
      </div>
    </div>
  </div>
    `;
  }
  container.innerHTML = elem;
  showSlides(slideIndex);
}
// ************************   hero carousel navigation  ******************************
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
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
  if (!(inputValue.trim() == "")) {
    location.href = "search.html" + "?" + "query=" + inputValue;
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
// *************   show hide navbar item sale and new container**********************
var bottomNavbar = document.getElementById("fixed-bottom-navbar");
var topPos = bottomNavbar.offsetTop;

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

function totalItemInCart() {
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  document.getElementById("item-counter").innerHTML = cartData.cartArr.length;
  document.getElementById("total-cart-price").innerText =
    cartData.cartArr.length * 999;
}
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