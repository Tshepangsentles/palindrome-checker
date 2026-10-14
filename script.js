   // Palindrome checker logic
const input = document.getElementById("word-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultEl = document.getElementById("result");
const historyEl = document.getElementById("history");
const emptyEl = document.getElementById("empty");

// Array storing every checked word with its result (not persistent)
let history = [];

// Returns true if the text reads the same forwards and backwards.
// Ignores case, spaces and punctuation ("A man, a plan, a canal: Panama" works).
function isPalindrome(text) {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned.length > 0 && cleaned === reversed;
}

function renderHistory() {
  historyEl.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.className = item.isPalindrome ? "yes" : "no";

    const word = document.createElement("span");
    word.textContent = item.word;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = item.isPalindrome ? "Palindrome" : "Not a palindrome";

    li.append(word, badge);
    historyEl.appendChild(li);
  });
  emptyEl.style.display = history.length ? "none" : "block";
}

function handleCheck() {
  const word = input.value.trim();

  if (!word) {
    resultEl.textContent = "Please enter a word first.";
    resultEl.className = "result no";
    return;
  }

  const result = isPalindrome(word);
  resultEl.textContent = result
    ? `"${word}" is a palindrome!`
    : `"${word}" is not a palindrome.`;
  resultEl.className = "result " + (result ? "yes" : "no");

  history.unshift({ word, isPalindrome: result }); // newest first
  renderHistory();

  input.value = "";
  input.focus();
}

checkBtn.addEventListener("click", handleCheck);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleCheck();
});
clearBtn.addEventListener("click", () => {
  history = [];
  resultEl.textContent = "";
  renderHistory();
});

renderHistory();
