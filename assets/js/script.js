"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// theme toggle functionality
const themeToggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

function updateThemeIcon(theme) {
  if (theme === "light") {
    themeToggleBtn.innerHTML = '<ion-icon name="sunny"></ion-icon>';
  } else {
    themeToggleBtn.innerHTML = '<ion-icon name="moon"></ion-icon>';
  }
}

themeToggleBtn.addEventListener("click", function () {
  const currentTheme = body.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// animated bubbles background
const bubblesConfig = [
  { delay: 0, duration: 8, startX: 10, size: 30, opacity: 0.6 },
  { delay: 1, duration: 10, startX: 30, size: 50, opacity: 0.5 },
  { delay: 2, duration: 9, startX: 50, size: 35, opacity: 0.55 },
  { delay: 0.5, duration: 11, startX: 70, size: 45, opacity: 0.5 },
  { delay: 3, duration: 8.5, startX: 85, size: 28, opacity: 0.6 },
  { delay: 1.5, duration: 9.5, startX: 20, size: 32, opacity: 0.55 },
  { delay: 2.5, duration: 10.5, startX: 60, size: 40, opacity: 0.5 },
  { delay: 4, duration: 7.5, startX: 40, size: 25, opacity: 0.65 },
  { delay: 0.8, duration: 9.2, startX: 15, size: 38, opacity: 0.52 },
  { delay: 3.2, duration: 11.5, startX: 75, size: 42, opacity: 0.48 },
];

function createBubbles() {
  const container = document.getElementById("bubblesContainer");
  if (!container) return;

  bubblesConfig.forEach((config) => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const size = config.size;
    const left = config.startX + (Math.random() - 0.5) * 10;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = left + "%";
    bubble.style.opacity = config.opacity;
    bubble.style.animationDuration = config.duration + "s";
    bubble.style.animationDelay = config.delay + "s";
    bubble.style.animationTimingFunction = "ease-in";

    container.appendChild(bubble);
  });
}

// Initialize bubbles on page load
document.addEventListener("DOMContentLoaded", createBubbles);

// Also call immediately in case DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createBubbles);
} else {
  createBubbles();
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]",
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]",
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Remove active class from all pages and links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
      navigationLinks[j].classList.remove("active");
    }

    // Add active class to clicked link and corresponding page
    navigationLinks[i].classList.add("active");
    pages[i].classList.add("active");
    window.scrollTo(0, 0);
  });
}
