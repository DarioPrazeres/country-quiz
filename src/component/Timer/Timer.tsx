import React from 'react';
import {TimerProps} from "../../types";

export function Timer({ timeLeft }: TimerProps) {
  return (
    <div className={`timer ${timeLeft <= 5 ? 'warning' : ''}`}>
      ⏱ {timeLeft}s
    </div>
  );
}