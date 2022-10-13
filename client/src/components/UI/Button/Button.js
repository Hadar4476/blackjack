import React from "react";

import classes from "./Button.module.scss";

const Button = (props) => {
  const { text, disable, className, emitClick } = props;

  return (
    <button
      className={`${classes.button} ${className}`}
      disabled={disable}
      onClick={emitClick}
    >
      {text}
    </button>
  );
};

export default Button;
