document.addEventListener("DOMContentLoaded", () => {
  const typewriter = document.querySelector(".typewriter h1");
  typewriter.addEventListener("animationend", (event) => {
    if (event.animationName === "typing") {

      setTimeout(() => {
        typewriter.style.borderRight = "none"; // Verwijder de cursor
      },0); // Na  seconden 0
    }
  });
});
