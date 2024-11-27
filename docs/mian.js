document.addEventListener("DOMContentLoaded", () => {
  const typewriter = document.querySelector(".typewriter h1");
  typewriter.addEventListener("animationend", (event) => {
    if (event.animationName === "typing") {
      // Verwijder de cursor na 3 seconden
      setTimeout(() => {
        typewriter.style.borderRight = "none"; // Verwijder de cursor
      }, 3000); // Na 3 seconden
    }
  });
});
