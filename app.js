body = document.querySelector("body");
// function populateData(data) {
//   trivia = document.createElement("p");
//   trivia.innerText = data;
//   body.insertAdjacentElement("beforeend", trivia);
// }

// fetch("http://numbersapi.com/7..13?json")
//   .then((response) => response.json())
//   .then((data) => populateData(data));

// let requests = [];
// function getFacts(num) {
//   for (let i = 0; i < 4; i++) {
//     request = fetch(`http://numbersapi.com/${num}?json`);
//     requests.push(request);
//   }
//   Promise.all(requests).then((values) => {
//     values.forEach((value) => {
//       value.json().then((data) => populateData(data.text));
//     });
//   });
// }

//getFacts(5);
const drawButton = document.querySelector("#draw-btn");

let deckID = "";

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((response) => response.json())
  .then((data) => (deckID = data.deck_id));
function drawCard() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => response.json())
    .then((data) => {
      data.cards.forEach((card) => {
        html = `<div class="card" style="transform: rotate(${
          Math.random() * 45
        }deg)">
                    <img src=${card.image} />
                  </div>`;
        body.insertAdjacentHTML("beforeend", html);
      });
    });
}

drawButton.addEventListener("click", drawCard);
