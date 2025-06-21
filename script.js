const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const wordSpan = document.getElementById("word");
const definitionSpan = document.getElementById("definition");
const errorMessage = document.getElementById("errorMessage");


async function fetchWordData(word) {

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!response.ok) {
      throw new Error("Word not found.");
    }

    const data = await response.json();
    const entry = data[0];

    wordSpan.textContent = entry.word || "-";

    definitionSpan.textContent = entry.meanings[0]?.definitions[0]?.definition || "-";

  } catch (err) {
    if (err.message.includes("Failed to fetch")) {
      errorMessage.textContent = "No internet connection.";
    } else {
      errorMessage.textContent = err.message;
    }
  } finally {
    loader.classList.add("hidden");
  }
}

searchBtn.addEventListener("click", () => {
  const word = searchInput.value.trim();
  if (word) fetchWordData(word);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const word = searchInput.value.trim();
    if (word) fetchWordData(word);
  }
});


window.addEventListener("load", () => {
  searchInput.focus();
});
