const messages = [



  "Before today ends...",

  "I have something I'd like to show you.",

  "I spent quite a lot of time making this.",

  "It may not be perfect, but I hope you enjoy it.",

  "I want to create a little memory for us.",

  "",

  "So...",

  "",

  "Will you stay with me",

  "until the very end? 🤪",
];

const typewriter = document.getElementById("typewriter");
const button = document.getElementById("continueBtn");

let line = 0;
let character = 0;

function type() {
  if (line >= messages.length) {
    typewriter.classList.remove("typing");

    button.classList.remove("hidden");

    button.classList.add("fade-up");

    return;
  }

  const current = messages[line];

  if (character < current.length) {
    typewriter.innerHTML += current.charAt(character);

    character++;

    setTimeout(type, 40);
  } else {
    typewriter.innerHTML += "\n\n";

    line++;
    character = 0;

    setTimeout(type, 500);
  }
}

type();

button.onclick = () => {
  document.body.classList.add("opacity-0");
  document.body.classList.add("duration-1000");

  setTimeout(() => {
    location.href = "story.html";
  }, 900);
};

// Floating Hearts

const container = document.getElementById("hearts");

setInterval(() => {
  const heart = document.createElement("div");

  heart.className = "heart";

  heart.innerHTML = "⭐";

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.fontSize = Math.random() * 20 + 16 + "px";

  heart.style.animationDuration = Math.random() * 5 + 7 + "s";

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
}, 250);
