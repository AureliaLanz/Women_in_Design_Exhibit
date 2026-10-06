const footerOptions = ["Are teeth bones you show?", "Why is a footer called a footer? If humans evolved to have heads for feet would we call it the header?", "Godzilla!!!"]

const messageButton = document.querySelector("#message-button");
const message = document.querySelector("#message");
const footerContent = document.querySelector("#footer-content");
const garyScene = document.querySelector(".gary-scene");
let isGaryPlaying = false;

footerContent.textContent = footerOptions[Math.floor(Math.random() * footerOptions.length)];

messageButton.addEventListener("click", () => {
    if (isGaryPlaying) return;

    isGaryPlaying = true;
    message.textContent = "Look! It's a message from Gary!";
    message.classList.add("is-visible");

    window.setTimeout(() => garyScene.classList.add("is-visible"), 500);
    window.setTimeout(() => garyScene.classList.add("show-dots"), 1500);
    window.setTimeout(() => garyScene.classList.add("show-bubble"), 2500);
    window.setTimeout(() => garyScene.classList.add("show-message"), 2900);

    window.setTimeout(() => {
        garyScene.addEventListener("transitionend", () => {
            garyScene.classList.remove(
                "is-visible",
                "is-leaving",
                "show-dots",
                "show-bubble",
                "show-message",
            );
            message.textContent = "";
            isGaryPlaying = false;
        }, {once: true});

        garyScene.classList.add("is-leaving");
        message.classList.remove("is-visible");
    }, 8500);
});
