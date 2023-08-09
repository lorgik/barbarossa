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

const tabsLinks = document.querySelectorAll(".tabs__list-link");
if (tabsLinks.length > 0) {
  tabsLinks[0].classList.add("active");

  const activeLink = document.querySelector(".tabs__list-link.active");

  let currentHash = activeLink.dataset.hash;

  tabsLinks.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      if (currentHash !== tab.dataset.hash) {
        tabsLinks.forEach(function (tab) {
          tab.classList.remove("active");
        });

        currentHash = tab.dataset.hash;
        tab.classList.add("active");
      }

      showArticles();

      e.preventDefault();
    });
  });

  const arcticlesCard = document.querySelectorAll(".articles-link");

  function showArticles() {
    arcticlesCard.forEach(function (card) {
      if (card.classList.contains("visible")) {
        card.classList.remove("visible");
      }
    });

    arcticlesCard.forEach(function (card) {
      if (card.dataset.hashCard === currentHash || currentHash === "#все") {
        card.classList.add("visible");
      }
    });

    arcticlesCard.forEach(function (card) {
      if (card.classList.contains("big-card")) {
        card.classList.remove("big-card");
      }
    });

    const visibleArticlesCards = document.querySelectorAll(".arcticles-card.visible");

    for (let i = 0; i < visibleArticlesCards.length / 9; i++) {
      if (visibleArticlesCards[0 + i * 9]) {
        visibleArticlesCards[0 + i * 9].classList.add("big-card");
      }
      if (visibleArticlesCards[4 + i * 9]) {
        visibleArticlesCards[4 + i * 9].classList.add("big-card");
      }
      if (visibleArticlesCards[8 + i * 9]) {
        visibleArticlesCards[8 + i * 9].classList.add("big-card");
      }
    }
  }

  showArticles();
}

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