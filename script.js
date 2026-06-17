let snippet = `function greet(name) {
  console.log("Hello " + name);
}

greet("Ateeb");`;

let codeBox = document.getElementById("code-box");
let speedText = document.getElementById("speed");
let accuracyText = document.getElementById("accuracy");

let index = 0;
let startTime = null;

// load text
function loadText() {
    codeBox.innerHTML = "";
    index = 0;

    for (let i = 0; i < snippet.length; i++) {
        let span = document.createElement("span");
        span.innerText = snippet[i];
        codeBox.appendChild(span);
    }
}

loadText();

// typing
document.addEventListener("keydown", function(e) {
    let spans = codeBox.querySelectorAll("span");

    if (!startTime) {
        startTime = new Date();
    }

    // normal key
    if (e.key.length === 1) {
        if (e.key === snippet[index]) {
            spans[index].style.color = "beige";
        } else {
            spans[index].style.color = "red";
        }

        index++;
        updateStats();
    }

    // backspace
    if (e.key === "Backspace" && index > 0) {
        index--;
        spans[index].style.color = "#f5f5dc";
    }
});

// stats
function updateStats() {
    let time = (new Date() - startTime) / 1000 / 60;

    let wpm = Math.floor((index / 5) / time);
    if (!wpm || wpm < 0) wpm = 0;

    speedText.innerText = wpm;

    let correct = 0;
    let spans = codeBox.querySelectorAll("span");

    for (let i = 0; i < index; i++) {
        if (spans[i].style.color === "beige") {
            correct++;
        }
    }

    let accuracy = Math.floor((correct / index) * 100);
    if (!accuracy) accuracy = 100;

    accuracyText.innerText = accuracy;
}

// restart
function restart() {
    startTime = null;
    speedText.innerText = 0;
    accuracyText.innerText = 100;
    loadText();
}