const messages = [
  "There are billions of people in this world.",

  "But somehow...",

  "You are here.",
  "I don't know if this little one",

  "can express everything I want to say...",


  "But I hope",

  "it can make you smile.",
  "Now...",
  "There is only one more step left.",
  "Keep patient naw Ama",
  "If you can complete it...",
  "You will get big big suprise from me.",
];

const story = document.getElementById("story");
const button = document.getElementById("missionBtn");

let line = 0;
let char = 0;

function type() {
  if (line >= messages.length) {
    story.classList.remove("typing");

    button.classList.remove("hidden");

    button.classList.add("fade");

    return;
  }

  const current = messages[line];

  if (char < current.length) {
    story.innerHTML += current.charAt(char);

    char++;

    setTimeout(type, 40);
  } else {
    story.innerHTML += "\n\n";

    line++;
    char = 0;

    setTimeout(type, 550);
  }
}

type();

button.onclick = () => {
  document.body.classList.add("opacity-0");
  document.body.classList.add("duration-1000");

  setTimeout(() => {
    location.href = "game.html";
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

  setTimeout(() => heart.remove(), 12000);
}, 250);
