// ---------- Intro typewriter ----------
const loadingScreen = document.getElementById("loadingScreen");
const loadingText = document.getElementById("loadingText");

const loadingMessages = [
  "Calculating compatibility... ❤️",
  "Reading your heart...",
  "Checking if you're amazing...",
  "100% Perfect Match Found.",
  "Preparing one final question...",
];
const messages = [
  "Alright, this is the final part.",

  "It's a game.",

  "I call it Flappy Heart.",

  "Guide the heart through the pipes without crashing.",

  "Reach a score of 5",
  
  "Fighting naw Ama You can do it naw 💫",
  "Ready?",
];

const typewriter = document.getElementById("typewriter");
const continueBtn = document.getElementById("continueBtn");

let line = 0;
let character = 0;

function type() {
  if (line >= messages.length) {
    typewriter.classList.remove("typing");

    continueBtn.classList.remove("hidden");
    continueBtn.classList.add("fade");

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

// ---------- Floating hearts ----------

const heartsContainer = document.getElementById("hearts");

setInterval(() => {
  const heart = document.createElement("div");

  heart.className = "heart";

  heart.innerHTML = "💫";

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.fontSize = Math.random() * 20 + 16 + "px";

  heart.style.animationDuration = Math.random() * 5 + 7 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}, 250);

// ---------- Flappy Heart game ----------

const introPhase = document.getElementById("introPhase");
const gamePhase = document.getElementById("gamePhase");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreLabel = document.getElementById("score");
const startPrompt = document.getElementById("startPrompt");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const finalScoreLabel = document.getElementById("finalScore");
const retryBtn = document.getElementById("retryBtn");

const WIN_SCORE = 5;

document.getElementById("winScoreLabel").textContent = WIN_SCORE;
document.getElementById("winScoreLabel2").textContent = WIN_SCORE;

const W = canvas.width;
const H = canvas.height;

const GRAVITY = 0.35;
const FLAP = -6.5;
const PIPE_WIDTH = 50;
const PIPE_GAP = 150;
const PIPE_SPEED = 2.3;
const PIPE_INTERVAL = 105;

let bird, pipes, frame, score, started, gameOver, rafId;

function resetGame() {
  bird = { x: 70, y: H / 2, vy: 0, r: 14 };
  pipes = [];
  frame = 0;
  score = 0;
  started = false;
  gameOver = false;

  scoreLabel.textContent = "0";

  gameOverOverlay.classList.add("hidden");
  startPrompt.classList.remove("hidden");

  draw();
}

function spawnPipe() {
  const margin = 40;
  const gapY = margin + Math.random() * (H - margin * 2 - PIPE_GAP);

  pipes.push({ x: W, gapY, passed: false });
}

function flap() {
  if (gameOver) return;

  if (!started) {
    started = true;
    startPrompt.classList.add("hidden");
    loop();
  }

  bird.vy = FLAP;
}

function update() {
  frame++;

  bird.vy += GRAVITY;
  bird.y += bird.vy;

  if (frame % PIPE_INTERVAL === 0) {
    spawnPipe();
  }

  for (const pipe of pipes) {
    pipe.x -= PIPE_SPEED;

    if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
      pipe.passed = true;
      score++;
      scoreLabel.textContent = score;

      if (score >= WIN_SCORE) {
        winGame();
        return;
      }
    }
  }

  while (pipes.length && pipes[0].x < -PIPE_WIDTH) {
    pipes.shift();
  }

  if (bird.y - bird.r < 0 || bird.y + bird.r > H) {
    endGame();
    return;
  }

  for (const pipe of pipes) {
    const inXRange = bird.x + bird.r > pipe.x && bird.x - bird.r < pipe.x + PIPE_WIDTH;

    if (inXRange) {
      const hitsTop = bird.y - bird.r < pipe.gapY;
      const hitsBottom = bird.y + bird.r > pipe.gapY + PIPE_GAP;

      if (hitsTop || hitsBottom) {
        endGame();
        return;
      }
    }
  }
}

function drawPipe(pipe) {
  const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
  gradient.addColorStop(0, "#f472b6");
  gradient.addColorStop(1, "#a855f7");

  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.roundRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY, 10);
  ctx.fill();

  ctx.beginPath();
  ctx.roundRect(pipe.x, pipe.gapY + PIPE_GAP, PIPE_WIDTH, H - (pipe.gapY + PIPE_GAP), 10);
  ctx.fill();

  ctx.font = "20px serif";
  ctx.textAlign = "center";
  ctx.fillText("🌸", pipe.x + PIPE_WIDTH / 2, pipe.gapY - 6);
  ctx.fillText("🌸", pipe.x + PIPE_WIDTH / 2, pipe.gapY + PIPE_GAP + 22);
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#1e1b4b");
  sky.addColorStop(1, "#3b0764");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  for (const pipe of pipes) {
    drawPipe(pipe);
  }

  ctx.save();
  ctx.translate(bird.x, bird.y);
  const angle = Math.max(-0.4, Math.min(0.9, bird.vy / 10));
  ctx.rotate(angle);
  ctx.font = "26px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("❤️", 0, 0);
  ctx.restore();
}

function loop() {
  if (gameOver) return;

  update();

  if (gameOver) return;

  draw();

  rafId = requestAnimationFrame(loop);
}

function endGame() {
  gameOver = true;
  cancelAnimationFrame(rafId);

  draw();

  finalScoreLabel.textContent = "Score: " + score + " — try again?";
  gameOverOverlay.classList.remove("hidden");
}

function winGame() {
  gameOver = true;
  cancelAnimationFrame(rafId);

  gamePhase.classList.add("hidden");

  loadingScreen.classList.remove("hidden");
  loadingScreen.classList.add("flex");

  let i = 0;

  loadingText.textContent = loadingMessages[0];

  const interval = setInterval(() => {
    i++;

    if (i < loadingMessages.length) {
      loadingText.textContent = loadingMessages[i];
    } else {
      clearInterval(interval);

      loadingScreen.classList.add("hidden");
      loadingScreen.classList.remove("flex");

      showProposal();
    }
  }, 900);
}

canvas.addEventListener("mousedown", flap);
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  flap();
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !gamePhase.classList.contains("hidden")) {
    e.preventDefault();
    flap();
  }
});

retryBtn.addEventListener("click", resetGame);

continueBtn.onclick = () => {
  introPhase.classList.add("hidden");
  gamePhase.classList.remove("hidden");

  resetGame();
};

// ---------- Proposal ----------

const proposal = document.getElementById("proposal");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const finalScreen = document.getElementById("finalScreen");
const finalMessage = document.getElementById("finalMessage");

const noResponses = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again...",
  "Last chance!",
  "Pretty please?",
  "You know you want to 🥺",
];

let yesScale = 1;
let noClicks = 0;

function showProposal() {
  proposal.classList.remove("hidden");
  proposal.classList.add("flex");
}

noBtn.addEventListener("click", () => {
  noClicks++;

  yesScale *= 1.7;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "50";

  noBtn.textContent = noResponses[Math.min(noClicks, noResponses.length - 1)];

  const dodge = Math.min(noClicks * 20, 140);
  noBtn.style.transform = `translateX(${noClicks % 2 === 0 ? dodge : -dodge}px)`;
});

yesBtn.addEventListener("click", () => {
  proposal.classList.add("hidden");
  proposal.classList.remove("flex");

  finalMessage.textContent =
    "Omg, I can't believe you said yes! 🥰💫\n\n" + "Kya naw anar mr Ama ko a myal htar chin tl a tutu shi nay yin sate chan thar p Ama a nar mr pl nay chin tot tl  amyar gyi chit pay pr ml naw sate cha pr Ama",
  finalScreen.classList.remove("hidden");
  finalScreen.classList.add("flex");
});
