const header = document.querySelector(".site-header");
const slides = [...document.querySelectorAll(".hero-slide")];
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const bookingForm = document.querySelector(".booking-panel");
const galleryButtons = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector("button");
const revealBlocks = document.querySelectorAll(".reveal");

let activeSlide = 0;

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
});

window.setInterval(() => {
  slides[activeSlide].classList.remove("is-active");
  activeSlide = (activeSlide + 1) % slides.length;
  slides[activeSlide].classList.add("is-active");
}, 5200);

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = bookingForm.querySelector("button");
  button.textContent = "Availability request sent";
  button.disabled = true;
});

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.dataset.image;
    const alt = button.querySelector("img").alt;
    lightboxImage.src = image;
    lightboxImage.alt = alt;
    lightbox.showModal();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealBlocks.forEach((block) => revealObserver.observe(block));
