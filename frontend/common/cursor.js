document.addEventListener("DOMContentLoaded", () => {
  const numCircles = 8;
  const circles = [];
  const coords = { x: 0, y: 0 };

  // Create circles dynamically
  for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement("div");
    circle.classList.add("trail-circle");
    circle.style.width = `${20 - i * 2}px`;
    circle.style.height = `${20 - i * 2}px`;
    document.body.appendChild(circle);
    circles.push({ el: circle, x: 0, y: 0 });
  }

  // Track mouse
  document.addEventListener("mousemove", (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  // Animation loop
  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      circle.x += (x - circle.x) * 0.3;
      circle.y += (y - circle.y) * 0.3;
      circle.el.style.left = `${circle.x}px`;
      circle.el.style.top = `${circle.y}px`;
      
      x += (circle.x - x) * 0.5;
      y += (circle.y - y) * 0.5;
    });

    requestAnimationFrame(animateCircles);
  }
  animateCircles();
});
