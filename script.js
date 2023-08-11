const word = document.getElementById("word");
const wordSeen = document.getElementById("wordFinal");
const jibberishSeen = document.getElementById("jibberish");
const slider = document.getElementById("checkbox");
const search = document.getElementById("searchBtn");
const entireSearch = document.getElementById("word");
const playBtn = document.getElementById("audio");
const nounDefinition = document.getElementById("nounArea");
const verbDefinition = document.getElementById("verbArea");

const synonyms = document.getElementById("synonyms");
const source = document.getElementById("source");

let x = document.getElementById("noun-section");

search.addEventListener("click", searchFunction);
word.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchFunction();
  }
});

async function searchFunction() {
  try {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value.toLowerCase()}`;
    const response = await fetch(url);
    const data = await response.json();
    displayData(data);
  } catch (error) {}
}

const displayData = (data) => {
  console.log(data);
  source.innerHTML = data[0].sourceUrls[0];
  wordSeen.innerHTML = data[0].word;
  jibberishSeen.innerHTML = data[0].phonetic || data[0].phonetics[1].text;

  nounDefinition.innerHTML = "";
  verbDefinition.innerHTML = "";
  synonyms.innerHTML = "No synonyms available.";

  const meanings = data[0].meanings[0].definitions;
  for (let i = 0; i < 4; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = meanings[i].definition;

    const bulletList = document.createElement("ul");
    bulletList.appendChild(listItem);

    nounDefinition.appendChild(bulletList);
  }

  const verbMeanings = data[0].meanings[1].definitions[0].definition;
  if (verbMeanings) {
    for (let i = 0; i < 1; i++) {
      const verbListItem = document.createElement("li");
      verbListItem.textContent = verbMeanings;

      const verbBulletList = document.createElement("ul");
      verbBulletList.appendChild(verbListItem);

      verbDefinition.appendChild(verbBulletList);
    }
  }
  const synonymList = data[0].meanings[0].synonyms;
  if (synonymList && synonymList.length > 0) {
    const synonymText = synonymList.join(", ");
    synonyms.textContent = synonymText;
  } else {
  }

  n.src = data[0].phonetics.find((phonetic) => phonetic.audio)?.audio;
};

slider.addEventListener("click", myFunction);

function myFunction() {
  const body = document.body;
  const currentBackgroundColor = body.style.backgroundColor;

  if (currentBackgroundColor === "black") {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    entireSearch.style.backgroundColor = "white";
    entireSearch.style.color = "black";
    source.style.color = "gray";
  } else {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    entireSearch.style.backgroundColor = "gray";
    entireSearch.style.color = "white";
    source.style.color = "white";
  }
}

const n = document.getElementById("playAudio");
playBtn.addEventListener("click", playAudio);

function playAudio() {
  n.play();
}
