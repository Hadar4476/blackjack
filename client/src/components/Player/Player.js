import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "../../store";
import drawCard from "../../utils/draw-card";

import Button from "../UI/Button/Button";
import CardImage from "../UI/CardImage/CardImage";

const Player = (props) => {
  const { emitAddNewCard } = props;

  const { deck } = useSelector((state) => state.deck);
  const { player, shouldPlayerStay } = useSelector((state) => state.game);
  const { cards } = player;

  const dispatch = useDispatch();

  const cardsContainerRef = useRef();

  // function for dispatching an action to indicate if the player decided to stay
  const onFinishPlayerTurn = () => {
    dispatch(globalActions.game.finishPlayerTurn());
  };

  const onDrawCard = () => {
    const newCard = drawCard(cards, deck);

    emitAddNewCard(newCard, "player");

    setTimeout(() => {
      cardsContainerRef.current.scrollLeft =
        cardsContainerRef.current.scrollWidth;
    }, 500);
  };

  // render cards images
  const cardElements = cards.map((c) => (
    <CardImage key={c.id} id={c.id} name={c.name} face={c.face} />
  ));

  // render buttons if its player's turn
  const actionsRenderer = !shouldPlayerStay && (
    <div className="actions">
      <Button text="Stay" emitClick={onFinishPlayerTurn} />
      <Button
        text="Hit"
        className="hit-button"
        disable={!Boolean(deck.length)}
        emitClick={onDrawCard}
      />
    </div>
  );

  return (
    <div className="container">
      <span className="title">You</span>
      {actionsRenderer}
      <div
        ref={cardsContainerRef}
        className={`cards-container ${cards.length === 2 && "starting-deck"}`}
      >
        {cardElements}
      </div>
    </div>
  );
};

export default Player;
