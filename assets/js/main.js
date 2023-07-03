// const slides = document.querySelectorAll(".gallery-slide");
// const arrowLeft = document.querySelector("#arrow-left");
// const arrowRight = document.querySelector("#arrow-right");

// const progressBar = document.querySelector("#progress-bar");
// const progressBarFill = document.querySelector("#progress-bar--fill");

// progressBarFill.style.width = progressBar.offsetWidth / slides.length + "px";

// const slider = [];

// for (let i = 0; i < slides.length; i++) {
//   slider[i] = [slides[i].src, slides[i].alt];
//   slides[i].remove();
// }

// const slideWidth = 416;
// const slideGap = 24;

// let step = 0;
// let offset = 0;
// let currentSlide = 0;

// // let step2 = 1;
// // let offset2 = 0;

// // function draw() {
// //   const img = document.createElement("img");
// //   img.src = slider[step2][0];
// //   img.alt = slider[step2][1];
// //   img.width = slideWidth;
// //   img.height = slideWidth;
// //   img.classList.add("gallery-slide");
// //   img.style.left =
// //     offset2 * slideWidth - slideWidth + slideGap * offset2 - slideGap + "px";

// //   document.querySelector("#gallery-slider").appendChild(img);

// //   if (step2 === 1) {
// //     step2 = 0;
// //   } else {
// //     step2--;
// //   }

// //   if (offset2 === 3) {
// //     offset2 = 0;
// //   } else {
// //     offset2--;
// //   }
// //   console.log(offset2);
// // }

// function draw() {
//   const img = document.createElement("img");
//   img.src = slider[step][0];
//   img.alt = slider[step][1];
//   img.width = slideWidth;
//   img.height = slideWidth;
//   img.classList.add("gallery-slide");
//   img.style.left = offset * slideWidth + slideGap * offset + "px";

//   document.querySelector("#gallery-slider").appendChild(img);

//   if (step === slider.length - 1) {
//     step = 0;
//   } else {
//     step++;
//   }

//   offset = 1;
// }

// // function left() {
// //   arrowLeft.removeEventListener("click", left);

// //   const slides2 = document.querySelectorAll(".gallery-slide");
// //   console.log(slides2);
// //   let offset2 = 0;
// //   for (let i = 0; i < slides2.length; i++) {
// //     slides2[i].style.left = (offset2 + 1) * (slideWidth + slideGap) + "px";
// //     offset2++;
// //   }

// //   setTimeout(() => {
// //     slides2[slides2.length - 1].remove();
// //     draw();
// //     arrowRight.addEventListener("click", left);
// //   }, 300);
// // }

// function right() {
//   arrowRight.removeEventListener("click", right);

//   const slides2 = document.querySelectorAll(".gallery-slide");
//   let offset2 = 0;
//   for (let i = 0; i < slides2.length; i++) {
//     slides2[i].style.left = slideWidth * (offset2 - 1) + "px";
//     offset2++;
//   }

//   setTimeout(() => {
//     slides2[0].remove();
//     draw();
//     arrowRight.addEventListener("click", right);
//   }, 300);
// }

// draw();
// draw();

// // arrowLeft.addEventListener("click", left);
// arrowRight.addEventListener("click", right);

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

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
      if (!e.target.closest(".popup__barbershop")) {
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
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

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
