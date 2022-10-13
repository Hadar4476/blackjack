import getRandomCard from "./random-card";

// function for drawing a random card,
// some property customization should be made
const drawCard = (to, from, isDealer = false) => {
  // check if any cards to pick
  if (from.length) {
    // using recursive function for extracting a random cards from the global deck
    const randomCard = getRandomCard(to, from);

    // create a new card object, face down if it is the first card of the dealer's deck
    const newCard = {
      ...randomCard,
      face: isDealer && !to.length ? "down" : "up",
    };

    return newCard;
  }
};

export default drawCard;
