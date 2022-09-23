const express = require("express");
const router = express.Router();

// json of card objects
const cards = require("../cards.json");

// shuffle the array of cards before sending them to client
const shuffleCards = (cards) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }

  return [...cards];
};

// <GET> http://localhost:3005/cards
// a route for sending shuffled cards
router.get("/", async (req, res) => {
  const shuffledCards = shuffleCards(cards);
  res.send(shuffledCards);
});

module.exports = router;
