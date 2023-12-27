import confetti from "https://cdn.skypack.dev/canvas-confetti";
const input = document.getElementById("user-input");
const form = document.getElementById("form");
const resultElement = document.querySelector("[data-result]");
const ouputTemplete = document.querySelector("[data-output]");
const music = new Audio();
const lose = document.getElementById("lose");

form.addEventListener("submit", checkThala);
function checkThala(e) {
  e.preventDefault();
  const userInput = input.value;
  showReasult(userInput, checkWin(userInput));
}

function checkWin(input) {
  if (isNaN(parseInt(input))) {
    return input.length === 7;
  }
  let sum = 0;
  String(input)
    .split("")
    .forEach((char) => {
      sum += parseInt(char);
    });
  return sum === 7;
}

function showReasult(userInput, win = true) {
  music.pause();
  lose.hidden = true;
  resultElement.innerHTML = "";
  if (!win) {
    lose.hidden = false;
    return;
  }
  const outputCard = ouputTemplete.content.cloneNode(true);
  outputCard.querySelector("[data-user-input]").innerText = userInput;
  const previewLink = `${window.location.protocol}//${window.location.hostname}/preview.html?text=${userInput}`;
  const tweetText = `Let's celebrate the magic of #ThalaForAReason together! Share your input and see what we all get. Maybe there's a hidden message for all of us?  Let's crack the code.  \n${previewLink}.  \n #theshanumalik @theshanumalik`;
  outputCard.querySelector(
    "[data-twitter]"
  ).href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;

  outputCard
    .querySelector("[data-btn-copy-link]")
    .addEventListener("click", () => {
      navigator.clipboard.writeText(previewLink).then(() => {
        alert("Link Copied");
      });
    });
  resultElement.appendChild(outputCard);
  confetti({
    spread: 150,
    particleCount: 500,
    origin: { y: 0.8 },
  });
  music.src = "./music/win.mp3";
  music.play();
}
