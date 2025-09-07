(function () {
  const BAND = 50; // half-height of the band
  const boxes = document.querySelectorAll(".future-box");
  if (!boxes.length) return;

  function makeObserver() {
    const shrink = Math.max(0, Math.floor(window.innerHeight / 2 - BAND));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle("is-centered", entry.isIntersecting);
      });
    }, {
      root: null,
      // shrink top & bottom so only a center stripe of height 2*BAND remains
      rootMargin: `-${shrink}px 0px -${shrink}px 0px`,
      threshold: 0 // fires as soon as it touches the stripe
    });

    boxes.forEach(b => io.observe(b));
    return io;
  }

  let observer = makeObserver();

  window.addEventListener("resize", () => {
    if (observer && observer.disconnect) observer.disconnect();
    observer = makeObserver();
  });
})();


document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#nav-circle a");
  const highlight = document.getElementById("highlight");

  function moveHighlight(link) {
    const left = link.offsetLeft;
    const width = link.offsetWidth;
    const height = link.offsetHeight;

    highlight.style.opacity = 1;
    highlight.style.width = width + "px";
    highlight.style.height = height + "px";
    highlight.style.transform = `translateX(${left}px) translateY(-50%)`;

    // Reset all text colors
    links.forEach(l => l.classList.remove("active-link"));
    // Set active one to black
    link.classList.add("active-link");
  }

  // Detect current page from URL
  const currentPage = window.location.pathname.split("/").pop();
  let activeLink = Array.from(links).find(
    link => link.getAttribute("href") === currentPage
  );

  if (!activeLink) {
    activeLink = links[0]; // fallback to first link
  }
  moveHighlight(activeLink);

  // Hover effect
  links.forEach(link => {
    link.addEventListener("mouseenter", () => moveHighlight(link));
  });

  document.getElementById("nav-circle").addEventListener("mouseleave", () => {
    moveHighlight(activeLink); // return to active page
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

document.addEventListener("DOMContentLoaded", () => {
  const sidebarText = document.querySelector(".side-bar-text");
  const studentSection = document.querySelectorAll(".features-stack")[0];
  const driverSection = document.querySelectorAll(".features-stack")[1];
  const footer = document.querySelector(".feature-footer");
  const header = document.querySelector(".opening-section");

  // Hide by default
  sidebarText.style.opacity = "0";

  // Function to change text
  function showText(text) {
    sidebarText.textContent = text;
    sidebarText.style.opacity = "1";
  }

  function hideText() {
    sidebarText.style.opacity = "0";
  }

  const options = {
    root: null,
    threshold: 0.01 // % of section visible before triggering
  };

  // Observer for Student Features
  const studentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showText("Student Features");
      }
    });
  }, options);

  // Observer for Driver Features
  const driverObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showText("Driver Features");
      }
    });
  }, options);

  // Observer for Footer → hide text
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hideText();
      }
    });
  }, { root: null, threshold: 0.1 });

  // Attach observers
  studentObserver.observe(studentSection);
  driverObserver.observe(driverSection);
  footerObserver.observe(footer);
  footerObserver.observe(header);
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

const cards = document.querySelectorAll('.core-value');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    cards.forEach(other => {
      // Pause pulse for everyone
      other.style.animation = 'none';
      
      if (other === card) {
        other.style.transform = 'scale(1.13, 1.25)';
      } else {
        other.style.transform = 'scale(0.87, 0.85)';
      }
    });
  });

  card.addEventListener('mouseleave', () => {
    // Reset + restore pulse
    cards.forEach(c => {
      c.style.transform = 'scale(1, 1)';
      c.style.animation = 'pulse 2s infinite';
    });
  });
});



document.querySelectorAll('.slide-up, .slide-down, .slide-left, .slide-right')
  .forEach(el => observer.observe(el));

window.addEventListener('scroll', checkSlide);
checkSlide();