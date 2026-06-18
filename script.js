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

let totalTyped = 0;
let correctTyped = 0;

let codeDiv = document.getElementById("code");
let wpmText = document.getElementById("wpm");
let rawText = document.getElementById("raw");
let accText = document.getElementById("acc");
let resultDiv = document.getElementById("result");

// LOAD
function load() {
    codeDiv.innerHTML = "";

    let arr = snippets[currentLang];
    text = arr[Math.floor(Math.random() * arr.length)];

    index = 0;
    startTime = null;
    totalTyped = 0;
    correctTyped = 0;

    for (let i = 0; i < text.length; i++) {
        let span = document.createElement("span");
        span.innerText = text[i];
        span.classList.add("char");

        if (i === 0) span.classList.add("active");

        codeDiv.appendChild(span);
    }
}

// LANGUAGE
function setLanguage(lang, e) {
    currentLang = lang;

    document.querySelectorAll(".sidebar button")
        .forEach(btn => btn.classList.remove("active-btn"));

    e.target.classList.add("active-btn");

    load();
    resetStats();
}

// TYPING
document.addEventListener("keydown", function(e) {
    let chars = document.querySelectorAll(".char");

    if (!startTime) startTime = new Date();

    if (e.key.length === 1) {

        totalTyped++;

        if (e.key === text[index]) {
            chars[index].classList.add("correct");
            chars[index].classList.remove("active");

            index++;
            correctTyped++;

            if (chars[index]) chars[index].classList.add("active");
        } else {
            chars[index].classList.add("wrong");
        }

        updateStats();

        if (index === text.length) endTest();
    }

    if (e.key === "Backspace" && index > 0) {
        index--;
        chars[index].classList.remove("correct", "wrong");
        chars[index].classList.add("active");
    }
});

// STATS
function updateStats() {
    let time = (new Date() - startTime) / 1000 / 60;

    let rawWPM = Math.floor((totalTyped / 5) / time) || 0;
    let wpm = Math.floor((correctTyped / 5) / time) || 0;

    rawText.innerText = rawWPM;
    wpmText.innerText = wpm;

    let acc = Math.floor((correctTyped / totalTyped) * 100) || 100;
    accText.innerText = acc + "%";
}

function resetStats() {
    wpmText.innerText = 0;
    rawText.innerText = 0;
    accText.innerText = "100%";
}

// END
function endTest() {
    let time = (new Date() - startTime) / 1000;

    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
        Finished! <br>
        WPM: ${wpmText.innerText} <br>
        RAW: ${rawText.innerText} <br>
        ACC: ${accText.innerText} <br>
        Time: ${time.toFixed(1)}s
    `;
}

// THEMES
let themes = ["dark", "light", "neon"];
let themeIndex = 0;

document.getElementById("themeBtn").onclick = function() {
    document.body.classList.remove(themes[themeIndex]);

    themeIndex = (themeIndex + 1) % themes.length;

    document.body.classList.add(themes[themeIndex]);
};

// INIT
load();