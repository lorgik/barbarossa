const slider = document.querySelector("#slider");
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");
const progressBar = document.querySelector("#progress-bar");
const progressBarFill = document.querySelector("#progress-bar--fill");

const slides = [].slice.call(slider.children);

const sliderWidth = slider.offsetWidth;
const sliderGap = 24;
const sliderSwaps = slides.length - 1;

let counts = 0;

const sliderInterval = setInterval(() => {
  slides[0].style.marginLeft = `${getMarginLeft() - scrollDistance}px`;
  progressBarFill.style.width = `${
    (progressBar.offsetWidth / slides.length) * (counts + 2)
  }px`;
  if (sliderSwaps === counts) {
    slides[0].style.marginLeft = 0;
    progressBarFill.style.width = `${
      progressBar.offsetWidth / slides.length
    }px`;
    return (counts = 0);
  }
  return counts++;
}, 5000);

progressBarFill.style.width = `${progressBar.offsetWidth / slides.length}px`;

const scrollDistance =
  (sliderWidth - sliderGap * sliderSwaps) / slides.length + sliderGap;

arrowLeft.addEventListener("click", function () {
  if (counts > 0) {
    slides[0].style.marginLeft = `${getMarginLeft() + scrollDistance}px`;

    progressBarFill.style.width = `${
      (progressBar.offsetWidth / slides.length) * counts
    }px`;
    console.log(progressBarFill.style.width);
    counts--;
  }
});

arrowRight.addEventListener("click", function () {
  if (counts < sliderSwaps) {
    slides[0].style.marginLeft = `${getMarginLeft() - scrollDistance}px`;

    progressBarFill.style.width = `${
      (progressBar.offsetWidth / slides.length) * (counts + 2)
    }px`;
    console.log(progressBarFill.style.width);
    counts++;
  }
});

function getMarginLeft() {
  const marginLeft = slides[0].style.marginLeft;
  return Number(marginLeft.slice(0, marginLeft.length - 2));
}
