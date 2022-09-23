import React from "react";
import { url } from "../../../my-axios";

import classes from "./CardImage.module.scss";

const CardImage = (props) => {
  const { name, face } = props;

  // set image source by value of "face" prop
  const imageSrc =
    url + `/images/cards/${face === "down" ? "card_face_down" : name}.png`;

  return (
    <div className={classes["card-image"]}>
      <img src={imageSrc} alt={name} />
    </div>
  );
};

export default CardImage;
