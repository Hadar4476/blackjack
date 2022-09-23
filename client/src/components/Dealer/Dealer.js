import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../../store";
import drawCard from "../../utils/draw-card";

import CardImage from "../UI/CardImage/CardImage";

const Dealer = (props) => {
  const { emitAddNewCard } = props;

  const { deck } = useSelector((state) => state.deck);
  const { dealer, shouldPlayerStay } = useSelector((state) => state.game);
  const { cards } = dealer;

  const dispatch = useDispatch();

  const dealerScore = useMemo(
    () => cards.reduce((acc, i) => acc + i.value, 0),
    [cards]
  );

  // check if player decided to stay, dealer starts playing if so
  useEffect(() => {
    if (shouldPlayerStay) {
      // dealer should draw until the deck's value count hits 17
      if (dealerScore <= 16) {
        const newCard = drawCard(cards, deck, true);

        emitAddNewCard(newCard, "dealer");
      } else {
        // if dealer finished, should announce the winner
        dispatch(globalActions.game.announceWinner());
      }
    }
  }, [shouldPlayerStay, dealerScore, cards, deck, emitAddNewCard, dispatch]);

  // render cards images
  const cardElements = cards.map((c) => (
    <CardImage key={c.id} id={c.id} name={c.name} face={c.face} />
  ));

  return (
    <div className="container">
      <span className="title">Dealer</span>
      <div
        className={`cards-container ${cards.length === 2 && "starting-deck"}`}
      >
        {cardElements}
      </div>
    </div>
  );
};

export default Dealer;