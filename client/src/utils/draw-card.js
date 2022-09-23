import getRandomCard from "./random-card";

// function for drawing a random card,
// some property customization should be made
const drawCard = (to, from, isDealer = false) => {
  // check if any cards to pick
  if (from.length) {
    // calculate the total values of cards in the passed deck
    const cardsScore = to.reduce((acc, i) => acc + i.value, 0);

    // using recursive function for extracting a random cards from the global deck
    const randomCard = getRandomCard(to, from);

    // check if the random card is "ace", according to the total values, the ace value should be changed
    // giving the participants the option to "bust" on different values of "aces"
    const isAce = randomCard.name.includes("ace");
    const shouldResetAce = isAce && cardsScore + randomCard.value > 21;

    // create a new card object, face down if it is the first card of the dealer's deck
    const newCard = {
      ...randomCard,
      value: shouldResetAce ? 1 : randomCard.value,
      face: isDealer && !to.length ? "down" : "up",
    };

    return newCard;
  }
};

export default drawCard;
