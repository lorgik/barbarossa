const slides = document.querySelectorAll(".gallery-link");
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");

const slider = Array.from(slides);

const progressBar = document.querySelector("#progress-bar");
const progressBarFill = document.querySelector("#progress-bar--fill");

const initialBar = progressBar.offsetWidth / slider.length;

const slideWidth = slider[0].offsetWidth;
const sliderGap = 24;
const scrollDisctance = slideWidth + sliderGap;
let currentMarginLeft = 0;
let scrolls = 0;

drawBar();

function scrollLeft(e) {
  e.preventDefault();

  if (scrolls !== 0) {
    slider[0].style.marginLeft = currentMarginLeft + scrollDisctance + "px";
    currentMarginLeft += scrollDisctance;
    scrolls--;
    drawBar();
  } else {
    currentMarginLeft = -scrollDisctance * (slider.length - 1);
    slider[0].style.marginLeft = currentMarginLeft + "px";
    scrolls = slider.length - 1;
    drawBar();
  }
}

function scrollRight(e) {
  e.preventDefault();

  if (scrolls < slider.length - 1) {
    slider[0].style.marginLeft = currentMarginLeft - scrollDisctance + "px";
    currentMarginLeft -= scrollDisctance;
    scrolls++;
    progressBarFill.style.width = progressBar.offsetWidth / slider.length;
    drawBar();
  } else {
    currentMarginLeft = 0;
    slider[0].style.marginLeft = currentMarginLeft;
    scrolls = 0;
    drawBar();
  }
}

function drawBar() {
  progressBarFill.style.width = (scrolls + 1) * initialBar + "px";
}

arrowLeft.addEventListener("click", scrollLeft);
arrowRight.addEventListener("click", scrollRight);

const popupImage = document.querySelector(".gallery-image");
const popupArrowLeft = document.querySelector("#popup-arrow__left");
const popupArrowRight = document.querySelector("#popup-arrow__right");

const sliderSrc = [];
let imageIndex = 0;

slider.forEach((slide, index) => {
  slide.addEventListener("click", function () {
    popupImage.src = slide.children[0].getAttribute("src");
    imageIndex = index;
  });
  sliderSrc.push(slide.children[0].getAttribute("src"));
});

popupArrowLeft.addEventListener("click", scrollImageLeft);
popupArrowRight.addEventListener("click", scrollImageRight);

function scrollImageLeft(e) {
  e.preventDefault();

  if (imageIndex > 0) {
    popupImage.src = sliderSrc[imageIndex - 1];
    imageIndex--;
  } else {
    popupImage.src = sliderSrc[sliderSrc.length - 1];
    imageIndex = sliderSrc.length - 1;
  }
}

function scrollImageRight(e) {
  e.preventDefault();

  if (imageIndex < sliderSrc.length - 1) {
    popupImage.src = sliderSrc[imageIndex + 1];
    imageIndex++;
  } else {
    popupImage.src = sliderSrc[0];
    imageIndex = 0;
  }
}

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.style.removeProperty("display");
});

let unlock = true;

const timeout = 300;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add("open");
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

$(document).ready(function () {
  $(".cosmetics-slider").slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 4,
    speed: 400,
    easing: "ease-in-out",
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    draggable: false,
    swipe: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          centerMode: false /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
          autoplaySpeed: 5000,
          arrows: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          centerMode: true /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          arrows: true,
        },
      },
    ],
  });

  const newsCardsLength = document.querySelectorAll(".news-card").length;

  $(".news-slider").slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: newsCardsLength > 2 ? 3 : newsCardsLength,
    speed: 400,
    easing: "ease-in-out",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
    swipe: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          centerMode: false /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          centerMode: false /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          arrows: false,
        },
      },
    ],
  });

  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth <= 576) {
    const articlesSlider = document.querySelector(".articles-box");
    articlesSlider.classList.add("articles-slider");
    const youtubeSlider = document.querySelector(".youtube-videos");
    youtubeSlider.classList.add("youtube-slider");
  }

  $(".articles-slider").slick({
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    speed: 400,
    easing: "ease-in-out",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
    swipe: true,
    centerMode: true,
    arrows: false,
  });
  $(".youtube-slider").slick({
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    speed: 400,
    easing: "ease-in-out",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
    swipe: true,
    centerMode: true,
    arrows: false,
  });
});

let scrollpos = window.scrollY;

const header = document.querySelector(".header");

const scrollChange = 27;

if (scrollpos >= scrollChange) {
  header.classList.add("fit-no-transition");
}

window.addEventListener("scroll", function () {
  scrollpos = window.scrollY;

  if (scrollpos >= scrollChange) {
    header.classList.add("fit");
  }
  if (scrollpos === 0) {
    header.classList.remove("fit");
    header.classList.remove("fit-no-transition");
  }
});

const articlesCards = document.querySelectorAll(".arcticles-card");
articlesCards[0].classList.add("big-card");
articlesCards[4].classList.add("big-card");

let windowInnerWidth = document.documentElement.clientWidth;

const page = document.querySelector("body");

const menu = document.querySelector(".menu__list");

const menuBtn = document.querySelector(".header-button");

const logo = document.querySelector(".header-logo__link");

let timer;
menuBtn.addEventListener("click", function () {
  if (!timer) {
    if (menu.classList.contains("active")) {
      menu.classList.add("animation");
      setTimeout(() => {
        menu.classList.remove("active");
        logo.classList.remove("active");
      }, 400);
    } else {
      menu.classList.remove("animation");
      menu.classList.add("active");
      logo.classList.add("active");
    }
    menuBtn.classList.toggle("active");
    page.classList.toggle("overflow-hidden");
    timer = setTimeout(() => (timer = clearTimeout(timer)), 400);
  }
});

const questionsCards = document.querySelectorAll(".questions-card");

questionsCards.forEach((card) => {
  const cardBtn = card.children[2];
  const cardText = card.children[1];
  cardBtn.addEventListener("click", (e) => {
    if (cardText.classList.contains("opened")) {
      cardText.classList.remove("opened");
      cardBtn.innerHTML = "Читать далее";
    } else {
      cardText.classList.add("opened");
      cardBtn.innerHTML = "Свернуть";
    }
  });
});
