const slider = document.getElementById("slider");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");

const slides = [].slice.call(slider.children);

const sliderWidth = slider.offsetWidth;
const sliderGap = 24;
const sliderSwaps = slides.length - 1;

let counts = sliderSwaps;

const scrollDistance =
  (sliderWidth - sliderGap * sliderSwaps) / slides.length + sliderGap;

function getMarginLeft() {
  const marginLeft = slides[0].style.marginLeft;
  return Number(marginLeft.slice(0, marginLeft.length - 2));
}

arrowLeft.addEventListener("click", function () {
  if (counts > 1) {
    slides[0].style.marginLeft = `${getMarginLeft() + scrollDistance}px`;
    counts--;
  }
});

arrowRight.addEventListener("click", function () {
  if (counts < sliderSwaps + 1) {
    slides[0].style.marginLeft = `${getMarginLeft() - scrollDistance}px`;
    counts++;
  }
});
