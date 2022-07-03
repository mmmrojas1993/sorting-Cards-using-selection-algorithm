/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

let Draw = document.querySelector("#Draw");
let Sort = document.querySelector("#Sort");
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let suits = ["♦", "♥", "♠", "♣"];
let orderCards = [];

function createLetter(elem) {
  let input = document.getElementById("Letters");
  let Letters = parseInt(input.value); //pido valor entero
  orderCards = [];

  for (let i = 0; i < Letters; i++) {
    let randomNumber = Math.floor(Math.random() * numbers.length);
    let randomSuit = Math.floor(Math.random() * suits.length);

    let card = document.createElement("div");
    card.classList.add("card");

    let topSuit = document.createElement("div");
    topSuit.classList.add("topSuit");
    topSuit.innerHTML = suits[randomSuit];

    let middleNumber = document.createElement("div");
    middleNumber.classList.add("middleNumber");
    middleNumber.innerHTML = numbers[randomNumber];

    let bottonSuit = document.createElement("div");
    bottonSuit.classList.add("bottonSuit");

    if (topSuit.innerHTML === "♥" || topSuit.innerHTML === "♦") {
      topSuit.style.color = "red";
      middleNumber.style.color = "red";
      bottonSuit.style.color = "red";
    } else {
      topSuit.style.color = "black";
      middleNumber.style.color = "black";
      bottonSuit.style.color = "black";
    }

    bottonSuit.innerHTML = topSuit.innerHTML;

    card.appendChild(topSuit);
    card.appendChild(middleNumber);
    card.appendChild(bottonSuit);
    elem.appendChild(card);

    let cardContent = {
      number: parseInt(changeValue(middleNumber.innerHTML)),
      html: card.innerHTML
    };

    orderCards.push(cardContent);
  }
}

function changeValue(valor) {
  switch (valor) {
    case "1":
      return "A";
    case "11":
      return "J";
    case "12":
      return "Q";
    case "13":
      return "K";
    default:
      return valor;
  }
}

Draw.addEventListener("click", e => {
  const cardDeck = document.querySelector("#cardDeck");
  cardDeck.innerHTML = "";
  createLetter(cardDeck);
  let sortDeck = document.getElementById("sortDeck");
  sortDeck.innerHTML = "";
});

Sort.addEventListener("click", e => {
  let sortDeck = document.getElementById("sortDeck");
  sortDeck.innerHTML = "";

  for (let j = 0; j < orderCards.length - 1; j++) {
    for (let i = j + 1; i < orderCards.length; i++) {
      if (orderCards[j].number > orderCards[i].number) {
        let aux = orderCards[j];
        orderCards[j] = orderCards[i];
        orderCards[i] = aux;

        let firstStep = document.createElement("div");
        firstStep.classList.add("lines");
        sortDeck.appendChild(firstStep);
        var lineBar = sortDeck.childElementCount;
        firstStep.innerHTML = lineBar;

        for (let h = 0; h < orderCards.length; h++) {
          let newCard = document.createElement("div");
          newCard.classList.add("newCard");
          newCard.innerHTML = orderCards[h].html;
          firstStep.appendChild(newCard);
        }
      }
    }
  }
});
