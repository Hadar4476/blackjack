import React, { useEffect } from "react";
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

  useEffect(() => {
    const playerScore = cards.reduce((acc, i) => acc + i.value, 0);

    if (playerScore > 21) {
      const containAces = cards.some(
        (c) => c.name.includes("ace") && c.value === 11
      );

      if (containAces) {
        dispatch(globalActions.game.resetAces("player"));
      }
    }
  }, [cards, dispatch]);

  // function for dispatching an action to indicate if the player decided to stay
  const onFinishPlayerTurn = () => {
    dispatch(globalActions.game.finishPlayerTurn());
  };

  const onDrawCard = () => {
    const newCard = drawCard(cards, deck);

    emitAddNewCard(newCard, "player");
  };

  // render cards images
  const cardElements = cards.map((c) => (
    <CardImage key={c.id} id={c.id} name={c.name} face={c.face} />
  ));

  // render buttons if its player's turn
  const actionsRenderer = !shouldPlayerStay && (
    <div className="actions">
      <Button text="Stay" emitClick={onFinishPlayerTurn} />
      <Button text="Hit" className="hit-button" emitClick={onDrawCard} />
    </div>
  );

  return (
    <div className="container">
      <span className="title">You</span>
      {actionsRenderer}
      <div
        className={`cards-container ${cards.length === 2 && "starting-deck"}`}
      >
        {cardElements}
      </div>
    </div>
  );
};

export default Player;
