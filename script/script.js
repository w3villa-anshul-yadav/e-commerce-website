
function owl1() {
  $(".owl1").owlCarousel({
    loop: true,
    margin: 25,
    nav: false,
    autoplay: true,
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
      1446: {
        items: 4,
      },
      1546: {
        items: 5,
      },
    },
  });
}

function owl2() {
  $(".owl2").owlCarousel({
    loop: true,
    margin: 25,
    nav: false,
    autoplay: true,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
      1446: {
        items: 4,
      },
    },
  });
}

function owl3() {
  $(".owl3").owlCarousel({
    loop: true,
    margin: 25,
    nav: false,
    autoplay: true,

    responsive: {
      0: {
        items: 1,
      },
      1120: {
        items: 1,
      },
      1140: {
        items: 2,
      },
      1446: {
        items: 3,
      },
      1780: {
        items: 4,
      },
    },
  });
}
function owl4() {
  $(".owl4").owlCarousel({
    loop: true,
    margin: 25,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      490: {
        items: 2,
      },
      668: {
        items: 3,
      },
      886: {
        items: 4,
      },
      1000: {
        items: 6,
      },
      1820: {
        items: 9,
      },
    },
  });
}
function owl5() {
  $(".owl5").owlCarousel({
    loop: true,
    margin: 25,
    nav: false,
    autoplay: true,

    responsive: {
      0: {
        items: 1,
      },
      774: {
        items: 2,
      },
      1210: {
        items: 3,
      },
    },
  });
}
function owl6() {
  $(".owl6").owlCarousel({
    loop: true,
    margin: 25,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      582: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1818: {
        items: 4,
      },
    },
  });
}
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
let mybutton = document.getElementsByClassName("top-navigation-controller")[0];
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "inline-block";
  } else {
    mybutton.style.display = "none";
  }
}
displayWhyBuyUs("top_categories");
async function displayWhyBuyUs(elem) {
  let response = await fetch("script/whyBuyFromUs.json");
  let responsData = await response.json();
  let data;
  switch (elem) {
    case "top_categories":
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
          <img src="${data[i].img}" alt="">
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
  let response = await fetch("script/featuredProducts.json");
  let responsData = await response.json();
  let data;
  switch (elem) {
    case "featured":
      data = responsData.featured;
      break;
    case "latest":
      data = responsData.latest;
      break;
    case "Bestsellers":
      data = responsData.Bestsellers;
      break;
    case "specials":
      data = responsData.specials;
      break;
  }
  let whyBuyContainer = document.getElementById("featured-products");
  let container = ` 
                <div class="owl-carousel owl2 owl-theme">`;
  for (i in data) {
    container += `
                        <div class="item">
                        <div class="featured-products-card">
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
                                  <input type="number" value="1">
                                  <input type="button" value="ADD TO CART">
                              </div>
                              <div>
                                  <i style="font-weight:100" class="fa-solid fa-heart"></i>
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
  container += `</div>`;
  whyBuyContainer.innerHTML = container;
  owl2();
}
displayfeaturedCategories();
async function displayfeaturedCategories() {
  let response = await fetch("script/featuredCategories.json");
  let responsData = await response.json();
  let data = responsData.featuredCategoriesData;
  let whyBuyContainer = document.getElementById("featured-category");
  let container = ` <div class="owl-carousel owl3 owl-theme">`;
  for (i in data) {
    container += `
     <div class="item">
     <div class="featured-products-card">
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
                     <input type="button" value="ADD TO CART">
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
  }
  container += `</div>`;
  whyBuyContainer.innerHTML = container;
  owl3();
}
displayOurBlog("latest_posts");
async function displayOurBlog(elem) {
  let response = await fetch("script/fromOurBlog.json");
  let responsData = await response.json();
  let data;
  switch (elem) {
    case "latest_posts":
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
                    <div class="image-container">
                        <img src="${data[i].img}" alt="" />

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
                    <div class="blog-details brand-model">
                        <i class="fa-solid fa-user"></i>
                        <p>${data[i].author}</p>
                        <i class="fa-regular fa-comment-dots"></i>
                        <p>${data[i].noOfComment}</p>
                        <i class="fa-solid fa-eye"></i>
                        <p>${data[i].views}</p>
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
  let response = await fetch("script/shopByBrandData.json");
  let responsData = await response.json();
  let data = responsData.shopByBrandData;
  let parentContainer = document.getElementById("shop-by-brand");
  let container = `<div class="owl-carousel owl4 owl-theme">
    `;
  for (i in data) {
    container += `<div class="item">
      <div class="featured-products-card">
        <div class="image-container">
          <img src="${data[i].img}" alt="" />
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
  let response = await fetch("script/improvedGalleryData.json");
  let responsData = await response.json();
  let data = responsData.improvedGalleryData;

  let container = document.getElementById("gallery-container");

  for (i in data) {
    container.innerHTML += `<img src="${data[i].img}" alt="gallery image">`;
  }
}
displayPeopleSaying();
async function displayPeopleSaying() {
  let container = document.getElementById("people-saying-about-us");
  let elem = `<div class="owl-carousel owl5 owl-theme">
  `;
  let response = await fetch("script/peopleSaying.json");
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
  let response = await fetch("script/mostViewed.json");
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
let slideIndex = 1;
displayHeroSlide();
async function displayHeroSlide() {
  let container = document.getElementById("hero-slider");
  let response = await fetch("script/heroSIlider.json");
  let responsData = await response.json();
  let data = responsData.heroSliderData;
  let elem=``;
  for (i in data) {
    elem += `
    <div class="mySlides fade">
    <img src="${data[i].img}" style="width: 100%" />
    <div class="text-over-image">
      <input type="button" value="${data[i].value}" />
      <h1>${data[i].text}</h1>
      <div class="learn-more">
        <p>LEARN MORE &rarr;</p>
      </div>
    </div>
  </div>
    `;
  }
  container.innerHTML = elem;
    showSlides(slideIndex );  
}
function plusSlides(n) {
  showSlides((slideIndex += n));
}
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
