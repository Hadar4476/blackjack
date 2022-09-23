const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  deck: [],
  isLoading: false,
  error: null,
};

// reducer for fetching the feck from server
const initDeck = (state) => {
  state.isLoading = true;
  state.error = null;
};

// reducer for initializing the deck if fetched successfully
const initDeckSuccess = (state, action) => {
  state.isLoading = false;
  state.deck = action.payload;
};

// reducer for indicating an error if fetch failed
const initDeckFail = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// reducer for drawing a card(splicing a card from the deck by its id)
const drawCard = (state, action) => {
  const cardId = action.payload;
  const cardInDeck = state.deck.findIndex((c) => c.id === cardId);

  state.deck.splice(cardInDeck, 1);
};

// create a slice to be exported for the deck
const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    initDeck,
    initDeckSuccess,
    initDeckFail,
    drawCard,
  },
});

export default deckSlice;
