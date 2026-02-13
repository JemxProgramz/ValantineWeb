const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

/**
 * 1. DYNAMIC BACKGROUND & PETALS
 */
document.body.style.transition = "background 2s ease";

function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    
    const size = Math.random() * 15 + 10 + "px";
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 3 + 2 + "s";
    petal.style.filter = `hue-rotate(${Math.random() * 20}deg)`; 
    
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 5000);
}

setInterval(createPetal, 300);

/**
 * 2. MOUSE SPARKLE EFFECT
 */
document.addEventListener("mousemove", (e) => {
    const sparkle = document.createElement("span");
    sparkle.innerHTML = "🌸"; 
    sparkle.style.position = "fixed";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    sparkle.style.fontSize = "10px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "999";
    sparkle.style.opacity = "1";
    sparkle.style.transition = "all 0.8s ease";
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.style.transform = `translateY(${(Math.random() - 0.5) * 50}px) scale(0)`;
        sparkle.style.opacity = "0";
    }, 50);

    setTimeout(() => sparkle.remove(), 800);
});

/**
 * 3. "NO" BUTTON RUNAWAY LOGIC + CHANGING MESSAGES
 */
const messages = [
    "No? 🥺",
    "Are you sure?",
    "Think again! 🌸",
    "Oh nooo!",
    "Why you try no? 😭",
    "PLeaseeee",
    "Don't do this to me...",
    "You're misclicking, right?",
    "Give it a chance! ❤️",
    "Click Yes instead! ✨"
];

let messageIndex = 0;

noBtn.addEventListener("mouseover", () => {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    const randomRotation = (Math.random() - 0.5) * 40; 

    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.transform = `rotate(${randomRotation}deg)`;

    // Update the message each time it's hovered
    noBtn.innerText = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
});

/**
 * 4. "YES" BUTTON & CELEBRATION
 */
yesBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
    heartLoader.style.display = "block";

    document.body.style.background = "radial-gradient(circle, #ffdee9 0%, #ff9a9e 100%)";

    setTimeout(() => {
        heartLoader.style.display = "none";
        resultContainer.style.display = "block";
        gifResult.play();
        
        for(let i = 0; i < 100; i++) {
            setTimeout(() => {
                const heart = document.createElement("div");
                heart.innerHTML = "❤️";
                heart.style.position = "fixed";
                heart.style.left = "50vw";
                heart.style.top = "50vh";
                heart.style.fontSize = Math.random() * 30 + 10 + "px";
                heart.style.transition = "all 2s ease-out";
                heart.style.zIndex = "1000";
                
                document.body.appendChild(heart);
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 400 + 100;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                setTimeout(() => {
                    heart.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`;
                    heart.style.opacity = "0";
                }, 10);
                
                setTimeout(() => heart.remove(), 2000);
            }, i * 15);
        }
    }, 3000);
});