const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  dealer: {
    cards: [],
  },
  player: {
    cards: [],
  },
  shouldPlayerStay: false,
  shouldAnnounceWinner: false,
  winner: "",
};

// reducer which should be triggered after both dealer and player finished their moves
const announceWinner = (state) => {
  state.shouldAnnounceWinner = true;
};

// reducer for finishing the game: revealing the face down card in dealer's deck and announcing the winner
const finishGame = (state, action) => {
  state.dealer.cards = state.dealer.cards.map((c) => {
    return {
      ...c,
      face: "up",
    };
  });
  state.winner = action.payload;
};

// reducer for indicating if the player decided to stay
const finishPlayerTurn = (state) => {
  state.shouldPlayerStay = true;
};

// reducer for appending a card to a participant deck
const drawCard = (state, action) => {
  const { newCard, participant } = action.payload;

  const aces = state[participant].cards.filter((c) => c.name.includes("ace"));
  const deckScore = state[participant].cards.reduce(
    (acc, i) => acc + i.value,
    0
  );

  const isAce = newCard.name.includes("ace");
  if (
    (!aces.length && isAce && deckScore + newCard.value > 21) ||
    (aces.length && isAce)
  ) {
    newCard.value = 1;
  }

  state[participant].cards.push(newCard);
};

// create a slice to be exported for the deck
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    announceWinner,
    finishGame,
    finishPlayerTurn,
    drawCard,
    restartGame: () => initialState,
  },
});

export default gameSlice;
