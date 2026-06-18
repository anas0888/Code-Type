let snippets = {
    js: [
`function greet(name) {
  console.log("Hello " + name);
}

greet("Ali");`
    ],
    c: [
`#include <stdio.h>

int main() {
    printf("Hello World");
    return 0;
}`
    ],
    cpp: [
`#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`
    ]
};

let currentLang = "js";
let text = "";
let index = 0;
let startTime = null;
let finished = false;


let totalKeystrokes = 0;
let correctKeystrokes = 0;


let rawKeystrokes = 0;

let codeDiv   = document.getElementById("code");
let wpmText   = document.getElementById("wpm");
let rawText   = document.getElementById("raw");
let accText   = document.getElementById("acc");
let resultDiv = document.getElementById("result");


function load() {
    codeDiv.innerHTML = "";
    resultDiv.classList.add("hidden");

    let arr = snippets[currentLang];
    text = arr[Math.floor(Math.random() * arr.length)];

    index = 0;
    startTime = null;
    finished = false;
    totalKeystrokes = 0;
    correctKeystrokes = 0;
    rawKeystrokes = 0;

    for (let i = 0; i < text.length; i++) {
        let span = document.createElement("span");
        span.textContent = text[i];
        span.classList.add("char");
        if (i === 0) span.classList.add("active");
        codeDiv.appendChild(span);
    }

    resetStats();
}


function setLanguage(lang, e) {
    currentLang = lang;

    document.querySelectorAll(".sidebar button")
        .forEach(btn => btn.classList.remove("active-btn"));

    e.target.classList.add("active-btn");

    load();
}


document.addEventListener("keydown", function(e) {
    if (finished) return;

    let chars = document.querySelectorAll(".char");

   
    if (e.key === " ") e.preventDefault();

   
    if (e.key === "Enter") e.preventDefault();

   
    if (e.key === "Backspace") {
        if (index === 0) return;

        chars[index].classList.remove("active");
        index--;

        if (chars[index].classList.contains("correct")) correctKeystrokes--;
        chars[index].classList.remove("correct", "wrong");
        chars[index].classList.add("active");

        totalKeystrokes--;

        updateStats();
        return;
    }

    
    let typedChar = e.key === "Enter" ? "\n" : e.key;

  
    if (typedChar !== "\n" && typedChar.length !== 1) return;

  
    if (!startTime) startTime = new Date();

    totalKeystrokes++;
    rawKeystrokes++;      

    if (typedChar === text[index]) {
        chars[index].classList.add("correct");
        correctKeystrokes++;
    } else {
        chars[index].classList.add("wrong");
    }

    chars[index].classList.remove("active");
    index++;

    if (index < chars.length) {
        chars[index].classList.add("active");
        chars[index].scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    updateStats();

    if (index === text.length) endTest();
});


function updateStats() {
    if (!startTime) return;

    let minutes = (new Date() - startTime) / 1000 / 60;


    let wpm = minutes > 0 ? Math.floor((correctKeystrokes / 5) / minutes) : 0;
    wpmText.innerText = wpm;

   
    let raw = minutes > 0 ? Math.floor((rawKeystrokes / 5) / minutes) : 0;
    rawText.innerText = raw;

   
    let acc = totalKeystrokes > 0
        ? Math.floor((correctKeystrokes / totalKeystrokes) * 100)
        : 100;
    accText.innerText = acc + "%";
}

function resetStats() {
    wpmText.innerText = 0;
    rawText.innerText = 0;
    accText.innerText = "100%";
}


function endTest() {
    finished = true;

    let time = ((new Date() - startTime) / 1000).toFixed(1);

    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
        ✅ Finished!<br>
        WPM: <strong>${wpmText.innerText}</strong> &nbsp;
        Raw: <strong>${rawText.innerText}</strong><br>
        Accuracy: <strong>${accText.innerText}</strong><br>
        Time: <strong>${time}s</strong><br>
        <button id="restart-btn" onclick="load()">↺ Restart</button>
    `;
}



let themes = ["dark", "light", "neon"];
let themeLabels = ["🌙 DARK", "☀️ LIGHT", "⚡ NEON"];
let themeIndex = 0;

let themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function () {
    document.body.classList.remove(themes[themeIndex]);
    themeIndex = (themeIndex + 1) % themes.length;
    document.body.classList.add(themes[themeIndex]);
    themeBtn.innerText = themeLabels[themeIndex];
};


load();