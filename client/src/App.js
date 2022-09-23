import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "./store";
import drawCard from "./utils/draw-card";

import Dealer from "./components/Dealer/Dealer";
import Player from "./components/Player/Player";
import Button from "./components/UI/Button/Button";

import "./App.css";

const App = () => {
  const { deck } = useSelector((state) => state.deck);
  const { dealer, player, winner, shouldAnnounceWinner } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();

  const { cards: dealerCards } = dealer;
  const { cards: playerCards } = player;

  const dealerScore = useMemo(
    () => dealerCards.reduce((acc, i) => acc + i.value, 0),
    [dealerCards]
  );
  const playerScore = useMemo(
    () => playerCards.reduce((acc, i) => acc + i.value, 0),
    [playerCards]
  );

  // dispatch an action for initializing the deck's state
  useEffect(() => {
    dispatch(globalActions.deck.initDeck());
  }, [dispatch]);

  // check if a winner should be declared based on a decision of the player to "stay"
  useEffect(() => {
    if (shouldAnnounceWinner) {
      const blackjack = 21;

      if (
        playerScore > blackjack ||
        dealerScore === blackjack ||
        dealerScore === playerScore ||
        (dealerScore < blackjack &&
          playerScore < blackjack &&
          dealerScore > playerScore)
      ) {
        dispatch(globalActions.game.finishGame("dealer"));
      } else if (
        dealerScore > blackjack ||
        playerScore === blackjack ||
        (playerScore < blackjack &&
          dealerScore < blackjack &&
          playerScore > dealerScore)
      ) {
        dispatch(globalActions.game.finishGame("player"));
      }
    }
  }, [shouldAnnounceWinner, dealerScore, playerScore, dispatch]);

  const onAddNewCard = useCallback(
    (newCard, participant) => {
      dispatch(globalActions.deck.drawCard(newCard.id));
      dispatch(
        globalActions.game.drawCard({
          newCard,
          participant,
        })
      );
    },
    [dispatch]
  );

  // initializing the cards for each participant
  useEffect(() => {
    if (deck.length && dealerCards.length < 2) {
      const newCard = drawCard(dealerCards, deck, true);

      onAddNewCard(newCard, "dealer");
    }

    // after dealer's deck is initialized, player's deck should be initialized
    if (dealerCards.length === 2 && playerCards.length < 2) {
      const newCard = drawCard(playerCards, deck);

      onAddNewCard(newCard, "player");
    }
  }, [deck, dealerCards, playerCards, onAddNewCard]);

  // function for restarting the game
  const onRestartGame = () => {
    // dispatch an action to reset the deck and game states to their initial state
    dispatch(globalActions.deck.initDeck());
    dispatch(globalActions.game.restartGame());
  };

  let resultText = null;

  // display different text according to the winner
  if (winner) {
    const text = winner === "dealer" ? "You Lost" : "You Won";
    resultText = (
      <div className="result">
        <span className="text">{text}</span>
        <Button
          text="Restart"
          className="restart-button"
          emitClick={onRestartGame}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <Dealer emitAddNewCard={onAddNewCard} />
      {resultText}
      <Player emitAddNewCard={onAddNewCard} />
    </div>
  );
};

export default App;
