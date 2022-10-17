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

  state[participant].cards.push(newCard);
};

const resetAces = (state, action) => {
  const participant = action.payload;

  const cards = [...state[participant].cards];
  const aces = cards.filter((c) => c.name.includes("ace"));
  const nonAces = cards.filter((c) => !c.name.includes("ace"));

  const nonAceScore = nonAces.reduce((acc, i) => acc + i.value, 0);

  if (aces.length) {
    for (let i = 0; i < aces.length; i++) {
      const ace = { ...aces[i] };
      const aceInCards = cards.findIndex((c) => c.id === ace.id);

      const allResetedScore = aces.reduce((acc) => acc++, 0);
      const partlyResetedScore = aces.slice(1).reduce((acc) => acc++, 0);

      if (11 + partlyResetedScore + nonAceScore < 21) {
        state[participant].cards[aceInCards].value = !i ? 11 : 1;
      } else if (allResetedScore + nonAceScore < 21) {
        state[participant].cards[aceInCards].value = 1;
      } else {
        state[participant].cards[aceInCards].value = 1;
      }
    }
  }
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
    resetAces,
    restartGame: () => initialState,
  },
});

export default gameSlice;
