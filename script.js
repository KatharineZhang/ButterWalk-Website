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
