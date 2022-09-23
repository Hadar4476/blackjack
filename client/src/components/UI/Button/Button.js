import React from "react";

import classes from "./Button.module.scss";

const Button = (props) => {
  const { text, className, emitClick } = props;

  return (
    <button className={`${classes.button} ${className}`} onClick={emitClick}>
      {text}
    </button>
  );
};

export default Button;
