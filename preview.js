window.addEventListener("load", generateThalaCard);

const element = document.querySelector("[data-user-input]");
const twitter = document.querySelector("[data-twitter]");

function generateThalaCard() {
  const params = new URLSearchParams(window.location.search);
  const input = params.get("text");
  const previewLink = `${window.location.protocol}//${window.location.hostname}/preview.html?text=${input}`;
  if (!input) {
    return;
  }
  if (!checkWin(input)) {
    return;
  }
  element.classList.remove("blur");
  element.innerText = input;
  const tweetText = `Let's celebrate the magic of #ThalaForAReason together! Share your input and see what we all get. Maybe there's a hidden message for all of us?  Let's crack the code.  \n${previewLink}.  \n #theshanumalik @theshanumalik`;
  twitter.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;
  document
    .querySelector("[data-btn-copy-link]")
    .addEventListener("click", () => {
      navigator.clipboard.writeText(previewLink).then(() => {
        alert("Link Copied");
      });
    });
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
