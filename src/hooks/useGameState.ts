import { useState } from "react";
import { generateRandomOrder, generateRandomQuestionPosition } from "../utils/gameUtils.ts";

export default function useGameState() {
  const [timeLeft, setTimeLeft] = useState(15);
  const [cont, setCont] = useState(0);
  const [point, setPoint] = useState(0);
  const [option, setOption] = useState(() => generateRandomOrder());
  const [questionPosition, setQuestionPosition] = useState(() => 
    generateRandomQuestionPosition()
  );
  const [showResult, setShowResult] = useState(false);
  const [played, setPlayed] = useState(0);

  const resetGame = () => {
    setPoint(0);
    setPlayed(0);
    setShowResult(false);
    setCont(0);
    setOption(generateRandomOrder());
    setQuestionPosition(generateRandomQuestionPosition());
  };

  return {
    cont,
    setCont,
    point,
    setPoint,
    option,
    setOption,
    questionPosition,
    setQuestionPosition,
    showResult,
    setShowResult,
    played,
    setPlayed,
    resetGame,
    timeLeft,
    setTimeLeft,
  };
}