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

$(document).ready(function () {
  $(".promotions-slider").slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 3,
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
          autoplaySpeed: 5000,
          arrows: false,
        },
      },
    ],
  });
});

let windowInnerWidth = document.documentElement.clientWidth;

const page = document.querySelector("body");

const menu = document.querySelector(".menu__list");

let menuBtn = document.querySelector(".header-button");

let timer;
menuBtn.addEventListener("click", function () {
  if (!timer) {
    if (menu.classList.contains("active")) {
      menu.classList.add("animation");
      setTimeout(() => {
        menu.classList.remove("active");
      }, 400);
    } else {
      menu.classList.remove("animation");
      menu.classList.add("active");
    }
    menuBtn.classList.toggle("active");
    page.classList.toggle("overflow-hidden");
    timer = setTimeout(() => (timer = clearTimeout(timer)), 400);
  }
});
