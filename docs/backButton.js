document.addEventListener("DOMContentLoaded", function () {
    let button = document.createElement("button");
    button.innerText = "back to Home Page";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.left = "20px";
    button.style.padding = "10px 15px";
    button.style.background = "rgb(43, 43, 43)";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.fontSize = "16px";
    button.style.zIndex = "1000";

    button.addEventListener("click", function () {
        window.location.href = "../index.html";
    });

    document.body.appendChild(button);
});
