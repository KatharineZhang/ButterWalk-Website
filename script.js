document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#nav-circle a");
  const highlight = document.getElementById("highlight");

  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const left = link.offsetLeft;
      const width = link.offsetWidth;
      const height = link.offsetHeight;

      highlight.style.opacity = 1;
      highlight.style.width = width + "px";
      highlight.style.height = height + "px";
      highlight.style.transform = `translateX(${left}px) translateY(-50%)`;
    });
  });

  document.getElementById("nav-circle").addEventListener("mouseleave", () => {
    highlight.style.opacity = 0;
  });
});

const slides = document.querySelectorAll('.slide-left, .slide-right, .slide-up, .slide-down');

function checkSlide() {
  const triggerBottom = window.innerHeight * 0.8; // start animation a bit before visible

  slides.forEach(slide => {
    const slideTop = slide.getBoundingClientRect().top;

    if(slideTop < triggerBottom) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active'); // optional: remove if scrolling back up
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active"); // optional
    }
  });
}, {
  threshold: 0.2 // adjust: 0.2 means 20% visible
});

document.querySelectorAll('.slide-up, .slide-down, .slide-left, .slide-right')
  .forEach(el => observer.observe(el));

window.addEventListener('scroll', checkSlide);
checkSlide();