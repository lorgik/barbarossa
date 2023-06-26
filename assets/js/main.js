const slider = document.getElementById("slider");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");

// console.log(slider.offsetWidth);

arrowLeft.addEventListener("click", function () {
  const slides = [].slice.call(slider.children);
  console.log(slides[0]);
  slides[0].style.marginLeft = slides[0].style.marginLeft + "440px";
});

arrowRight.addEventListener("click", function () {
  const slides = [].slice.call(slider.children);
  console.log(slides[0]);
  slides[0].style.marginLeft = "-440px";
});
