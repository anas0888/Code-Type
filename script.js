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

let codeDiv = document.getElementById("code");
let wpmText = document.getElementById("wpm");
let accText = document.getElementById("acc");
let resultDiv = document.getElementById("result");


function load() {
    codeDiv.innerHTML = "";
    resultDiv.classList.add("hidden");

    let arr = snippets[currentLang];
    text = arr[Math.floor(Math.random() * arr.length)];

    index = 0;
    startTime = null;

    for (let i = 0; i < text.length; i++) {
        let span = document.createElement("span");
        span.innerText = text[i];
        span.classList.add("char");

        if (i === 0) span.classList.add("active");

        codeDiv.appendChild(span);
    }
}


function setLanguage(lang, e) {
    currentLang = lang;

    document.querySelectorAll(".sidebar button")
        .forEach(btn => btn.classList.remove("active-btn"));

    e.target.classList.add("active-btn");

    load();
    resetStats();
}


document.addEventListener("keydown", function(e) {
    let chars = document.querySelectorAll(".char");

    if (!startTime) startTime = new Date();

    if (e.key.length === 1) {
        if (e.key === text[index]) {
            chars[index].classList.add("correct");
        } else {
            chars[index].classList.add("wrong");
        }

        chars[index].classList.remove("active");
        index++;

        if (chars[index]) chars[index].classList.add("active");

        updateStats();

        if (index === text.length) endTest();
    }

    if (e.key === "Backspace" && index > 0) {
        chars[index].classList.remove("active");
        index--;

        chars[index].classList.remove("correct", "wrong");
        chars[index].classList.add("active");
    }
});


function updateStats() {
    let time = (new Date() - startTime) / 1000 / 60;

    let wpm = Math.floor((index / 5) / time) || 0;
    wpmText.innerText = wpm;

    let correct = document.querySelectorAll(".correct").length;
    let acc = Math.floor((correct / index) * 100) || 100;

    accText.innerText = acc + "%";
}

function resetStats() {
    wpmText.innerText = 0;
    accText.innerText = "100%";
}


function endTest() {
    let time = (new Date() - startTime) / 1000;

    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
        Finished! <br>
        WPM: ${wpmText.innerText} <br>
        Accuracy: ${accText.innerText} <br>
        Time: ${time.toFixed(1)}s
    `;
}


let themes = ["dark", "light", "neon"];
let themeIndex = 0;

let themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function() {
    document.body.classList.remove(themes[themeIndex]);

    themeIndex = (themeIndex + 1) % themes.length;

    document.body.classList.add(themes[themeIndex]);

    themeBtn.innerText = themes[themeIndex].toUpperCase();
};


load();