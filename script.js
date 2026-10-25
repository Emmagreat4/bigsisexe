
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
const portal = document.getElementById("portal");

let animationStarted = false;
let drops = [];
let fontSize = 14;

function resizeMatrix() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  fontSize = window.innerWidth < 500 ? 12 : 14;

  const columns = Math.ceil(window.innerWidth / fontSize);
  drops = Array.from(
    { length: columns },
    () => Math.random() * -window.innerHeight / fontSize
  );
}

function drawMatrix() {
  if (!animationStarted) return;

  ctx.fillStyle = "rgba(3, 8, 6, 0.09)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.font = fontSize + "px monospace";

  const characters =
    "01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < drops.length; i++) {
    const character =
      characters[Math.floor(Math.random() * characters.length)];

    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillStyle = Math.random() > 0.97 ? "#ffffff" : "#42ff91";
    ctx.fillText(character, x, y);

    if (
      y > window.innerHeight &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i] += 0.7;
  }

  requestAnimationFrame(drawMatrix);
}

function startTakeover() {
  if (animationStarted) return;

  animationStarted = true;
  resizeMatrix();

  portal.innerHTML = `
    <div class="status">
      <span class="status-dot"></span>
      INITIALIZING TERMINAL
    </div>

    <div class="shield">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 8 L85 22 V48 C85 70 70 85 50 94
        C30 85 15 70 15 48 V22 Z"
          fill="none" stroke="currentColor" stroke-width="4"/>
        <path d="M50 28 V53 M50 66 V68"
          fill="none" stroke="currentColor" stroke-width="6"
          stroke-linecap="round"/>
      </svg>
    </div>

    <p class="eyebrow">AUTOMATED SECURITY SEQUENCE</p>

    <h1>SYSTEM<br /><span>INITIALIZING</span></h1>

    <p class="description" id="scanMessage">
      Preparing visual simulation...
    </p>

    <div class="system-info">
      <div>
        <span>TERMINAL</span>
        <strong id="terminalStatus">STARTING</strong>
      </div>
      <div>
        <span>VISUAL SIMULATION</span>
        <strong>ACTIVE</strong>
      </div>
      <div>
        <span>DEVICE ACCESS</span>
        <strong>NONE</strong>
      </div>
    </div>

    <div class="progress-track">
      <div class="progress-fill" id="progressFill"></div>
    </div>

    <p class="progress-label" id="progressLabel">0%</p>

    <div class="terminal-output" id="terminalOutput"
      aria-live="polite"></div>

    <p class="footer-note">OPERATION BIG SISTER.EXE</p>
  `;

  document.body.classList.add("hacking-mode");

  const messages = [
    "Loading visual terminal...",
    "Generating simulated system logs...",
    "Establishing cinematic interface...",
    "Preparing identity verification..."
  ];

  const logs = [
    "[OK] Terminal initialized",
    "[OK] Visual effects activated",
    "[RUN] Generating fictional scan report",
    "[OK] Identity verification pending"
  ];

  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
  const scanMessage = document.getElementById("scanMessage");
  const terminalStatus = document.getElementById("terminalStatus");
  const terminalOutput = document.getElementById("terminalOutput");

  let progress = 0;
  let logIndex = 0;

  const scanTimer = setInterval(() => {
    progress = Math.min(progress + Math.floor(Math.random() * 9) + 4, 100);

    progressFill.style.width = progress + "%";
    progressLabel.textContent = progress + "%";

    const messageIndex = Math.min(
      Math.floor(progress / 30),
      messages.length - 1
    );

    scanMessage.textContent = messages[messageIndex];

    if (progress >= 25) {
      terminalStatus.textContent = "RUNNING";
    }

    if (logIndex < logs.length && progress >= (logIndex + 1) * 20) {
      const line = document.createElement("p");
      line.textContent = logs[logIndex];
      terminalOutput.appendChild(line);
      logIndex++;
    }

    if (progress >= 100) {
      clearInterval(scanTimer);

      terminalStatus.textContent = "READY";
      scanMessage.textContent = "Initial sequence complete.";

      const continueButton = document.createElement("button");
      continueButton.id = "continueButton";
      continueButton.textContent = "CONTINUE TO VERIFICATION  →";
      continueButton.addEventListener("click", showVerification);

      portal.appendChild(continueButton);
    }
  }, 550);

  requestAnimationFrame(drawMatrix);
}

function showVerification() {
  portal.innerHTML = `
    <div class="status">
      <span class="status-dot"></span>
      IDENTITY VERIFICATION
    </div>

    <p class="eyebrow verification-eyebrow">USER CLASSIFICATION PROTOCOL</p>

    <h1>WHO'S<br /><span>USING THIS DEVICE?</span></h1>

    <p class="description">
      The system has one very important question.
      Answer carefully.
    </p>

    <div class="verification-options">
      <button class="choice-button" data-choice="owner">
        <span>01</span> The owner of this phone
      </button>

      <button class="choice-button" data-choice="senior">
        <span>02</span> A very senior sibling
      </button>

      <button class="choice-button" data-choice="boss">
        <span>03</span> The boss of everybody
      </button>
    </div>

    <p class="footer-note">CHOOSE YOUR CLASSIFICATION</p>
  `;

  portal.querySelectorAll(".choice-button").forEach(button => {
    button.addEventListener("click", () => {
      const choice = button.dataset.choice;
      showVerdict(choice);
    });
  });
}

function showVerdict(choice) {
  let response;

  if (choice === "owner") {
    response = "Ownership confirmed. Seniority status still under investigation.";
  } else if (choice === "senior") {
    response = "SENIORITY DETECTED. This may explain several suspicious family incidents.";
  } else {
    response = "UNLIMITED AUTHORITY CLAIM DETECTED. Somebody needs to calm down.";
  }

  portal.innerHTML = `
    <div class="status">
      <span class="status-dot"></span>
      CLASSIFICATION COMPLETE
    </div>

    <div class="shield verdict-icon">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 8 L85 22 V48 C85 70 70 85 50 94
        C30 85 15 70 15 48 V22 Z"
          fill="none" stroke="currentColor" stroke-width="4"/>
        <path d="M30 36 L70 64 M70 36 L30 64"
          fill="none" stroke="currentColor" stroke-width="5"
          stroke-linecap="round"/>
      </svg>
    </div>

    <p class="eyebrow">AUTOMATED VERDICT</p>

    <h1>STATUS<br /><span>UNDER REVIEW</span></h1>

    <p class="description">${response}</p>

    <div class="system-info">
      <div>
        <span>RESULT</span>
        <strong>INTERESTING</strong>
      </div>
      <div>
        <span>NEXT STEP</span>
        <strong>FAMILY AUDIT</strong>
      </div>
    </div>

    <button id="auditButton">
      <span>RUN FAMILY AUDIT</span>
      <span class="arrow">↗</span>
    </button>

    <p class="footer-note">OPERATION BIG SISTER.EXE</p>
  `;

  document.getElementById("auditButton").addEventListener("click", showAudit);
}

function showAudit() {
  portal.innerHTML = `
    <div class="status">
      <span class="status-dot"></span>
      FAMILY AUDIT
    </div>

    <p class="eyebrow">CONFIDENTIAL QUESTIONNAIRE</p>

    <h1>BE HONEST.<br /><span>WE KNOW NOTHING.</span></h1>

    <p class="description">
      This is a joke questionnaire. No personal information is collected.
    </p>

    <p class="audit-question">
      Have you ever used your seniority to disturb your younger brother?
    </p>

    <div class="verification-options">
      <button class="choice-button" data-answer="yes">YES. NATURALLY.</button>
      <button class="choice-button" data-answer="no">NO. NEVER.</button>
      <button class="choice-button" data-answer="deny">I REFUSE TO ANSWER.</button>
    </div>

    <p class="footer-note">YOUR ANSWER WILL BE JUDGED BY ABSOLUTELY NOBODY</p>
  `;

  portal.querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.dataset.answer;
      showFinalReveal(answer);
    });
  });
}

function showFinalReveal(answer) {
  let verdict = "";

  if (answer === "yes") {
    verdict = "CONFESSION ACCEPTED. The system appreciates your honesty.";
  } else if (answer === "no") {
    verdict = "DENIAL DETECTED. The system has decided to remain suspicious.";
  } else {
    verdict = "SILENCE DETECTED. The system considers this a dramatic response.";
  }

  portal.innerHTML = `
    <div class="status">
      <span class="status-dot"></span>
      FINAL REPORT GENERATED
    </div>

    <p class="eyebrow">OPERATION COMPLETE</p>

    <h1>HACKER<br /><span>IDENTIFIED</span></h1>

    <div class="reveal-box">
      <p>THE PERSON BEHIND THIS ENTIRE OPERATION IS...</p>
      <h2>YOUR YOUNGER BROTHER.</h2>
      <p>😂 GOT YOU!</p>
    </div>

    <p class="description">${verdict}</p>

    <div class="system-info">
      <div>
        <span>ACTUAL DEVICE ACCESS</span>
        <strong>NONE</strong>
      </div>
      <div>
        <span>FAMILY TROUBLEMAKER</span>
        <strong>CONFIRMED</strong>
      </div>
    </div>

    <p class="description">
      Sentence: Put up with your younger brother indefinitely.
    </p>

    <button id="replayButton">
      <span>RUN THE SIMULATION AGAIN</span>
      <span class="arrow">↗</span>
    </button>

    <p class="footer-note">MADE BY YOUR ANNOYING YOUNGER BROTHER</p>
  `;

  document.getElementById("replayButton").addEventListener("click", () => {
    window.location.reload();
  });
}

window.addEventListener("resize", resizeMatrix);

resizeMatrix();

startButton.addEventListener("click", startTakeover);
