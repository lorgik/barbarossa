const slides = document.querySelectorAll(".gallery-slide");
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");

const progressBar = document.querySelector("#progress-bar");
const progressBarFill = document.querySelector("#progress-bar--fill");

progressBarFill.style.width = progressBar.offsetWidth / slides.length + "px";

const slider = [];

for (let i = 0; i < slides.length; i++) {
  slider[i] = [slides[i].src, slides[i].alt];
  slides[i].remove();
}

const slideWidth = 416;
const slideGap = 24;

let step = 0;
let offset = 0;
let currentSlide = 0;

// let step2 = 1;
// let offset2 = 0;

// function draw() {
//   const img = document.createElement("img");
//   img.src = slider[step2][0];
//   img.alt = slider[step2][1];
//   img.width = slideWidth;
//   img.height = slideWidth;
//   img.classList.add("gallery-slide");
//   img.style.left =
//     offset2 * slideWidth - slideWidth + slideGap * offset2 - slideGap + "px";

//   document.querySelector("#gallery-slider").appendChild(img);

//   if (step2 === 1) {
//     step2 = 0;
//   } else {
//     step2--;
//   }

//   if (offset2 === 3) {
//     offset2 = 0;
//   } else {
//     offset2--;
//   }
//   console.log(offset2);
// }

function draw() {
  const img = document.createElement("img");
  img.src = slider[step][0];
  img.alt = slider[step][1];
  img.width = slideWidth;
  img.height = slideWidth;
  img.classList.add("gallery-slide");
  img.style.left = offset * slideWidth + slideGap * offset + "px";

  document.querySelector("#gallery-slider").appendChild(img);

  if (step === slider.length - 1) {
    step = 0;
  } else {
    step++;
  }

  offset = 1;
}

// function left() {
//   arrowLeft.removeEventListener("click", left);

//   const slides2 = document.querySelectorAll(".gallery-slide");
//   console.log(slides2);
//   let offset2 = 0;
//   for (let i = 0; i < slides2.length; i++) {
//     slides2[i].style.left = (offset2 + 1) * (slideWidth + slideGap) + "px";
//     offset2++;
//   }

//   setTimeout(() => {
//     slides2[slides2.length - 1].remove();
//     draw();
//     arrowRight.addEventListener("click", left);
//   }, 300);
// }

function right() {
  arrowRight.removeEventListener("click", right);

  const slides2 = document.querySelectorAll(".gallery-slide");
  let offset2 = 0;
  for (let i = 0; i < slides2.length; i++) {
    slides2[i].style.left = slideWidth * (offset2 - 1) + "px";
    offset2++;
  }

  setTimeout(() => {
    slides2[0].remove();
    draw();
    arrowRight.addEventListener("click", right);
  }, 300);
}

draw();
draw();

// arrowLeft.addEventListener("click", left);
arrowRight.addEventListener("click", right);
