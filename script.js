let mainArray = [
    {code: "const reversed = arr.reverse();"},
       { code: "const evens = arr.filter(n => n % 2 === 0);" }
]
const mainArea = document.querySelector('.typing-space');


const currentProblem = mainArray[0];
const codeToType = currentProblem.code;
 mainArea.innerHTML = codeToType;