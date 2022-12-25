body = document.querySelector("body");
function populateData(data) {
  trivia = document.createElement("p");
  trivia.innerText = data;
  body.insertAdjacentElement("beforeend", trivia);
}

async function fetchTrivia(start, stop) {
  const response = await fetch(`http://numbersapi.com/${start}..${stop}?json`)
    .then((response) => response.json())
    .then((data) => data);

  for (let item of Object.entries(response)) {
    populateData(item[1]);
  }
}

fetchTrivia(20, 25);

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

// let deckID = "";

// fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//   .then((response) => response.json())
//   .then((data) => (deckID = data.deck_id));
// function drawCard() {
//   fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
//     .then((response) => response.json())
//     .then((data) => {
//       data.cards.forEach((card) => {
//         html = `<div class="card" style="transform: rotate(${
//           Math.random() * 45
//         }deg)">
//                     <img src=${card.image} />
//                   </div>`;
//         body.insertAdjacentHTML("beforeend", html);
//       });
//     });
// }

class deck {
  constructor() {
    this.init();
  }
  async init() {
    let response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    )
      .then((response) => response.json())
      .then((data) => data.deck_id);
    this.deckID = response;
  }

  populateHTML = function (card) {
    let html = `<div class="card" style="transform: rotate(${
      Math.random() * 45
    }deg)">
                <img src=${card.image} />
              </div>`;
    body.insertAdjacentHTML("beforeend", html);
  };

  async drawCard() {
    let response = await fetch(
      `https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`
    )
      .then((response) => response.json())
      .then((data) => data);
    console.log(response);
    this.populateHTML(response.cards[0]);
  }
}

let d = new deck();

drawButton.addEventListener("click", d.drawCard.bind(d));
