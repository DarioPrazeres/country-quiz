import React from 'react';
import {OptionButtonProps} from "../../types/index.ts";

export function OptionButton({
  index,
  text,
  isChosen,
  isCorrect,
  answered,
  onClick,
}: OptionButtonProps) {
  let className = "neutro";
  if (answered) {
    if (isCorrect) className = "correct";
    else if (isChosen) className = "incorrect";
  }

  return (
    <button
      className={`option-${index} ${className}`}
      onClick={onClick}
      disabled={answered}
    >
      <p>{text}</p>
    </button>
  );
}