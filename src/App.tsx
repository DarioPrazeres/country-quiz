import React, { createContext, useMemo } from "react";
import Question from "./component/Question/Question.tsx";
import OptionAnswer from "./component/OptionAnswer/OptionAnswer.tsx";
import Result from "./component/Result/Result.tsx";
import { QuizHeader } from "./component/QuizHeader/QuizHeader.tsx";
import { ProgressBar } from "./component/ProgressBar/ProgressBar.tsx";
import { useTranslation } from "react-i18next";
import { GameContentProps, ContContextType } from "./types/index.ts";
import useGameData from "./hooks/useGameData.ts";
import useGameState from "./hooks/useGameState.ts";

const CONTINENTS = [
  "Africa",
  "Asia", 
  "North America",
  "South America",
  "Antarctica",
  "Europe",
  "Oceania",
] as const;

const TOTAL_QUESTIONS = 5;

const GameContent: React.FC<GameContentProps> = ({ 
  showResult, 
  point 
}) => {
  if (showResult) {
    return <Result point={point} />;
  }

  return (
    <div className="questionSection">
      <Question />
      <OptionAnswer />
    </div>
  );
};

export const ContContext = createContext<ContContextType | null>(null);

function App() {
  const { t } = useTranslation();
  const gameState = useGameState();
  const gameData = useGameData();

  const contextValue = useMemo<ContContextType>(() => ({
    ...gameState,
    ...gameData,
    continents: CONTINENTS,
    t,
  }), [gameState, gameData, t]);

  const currentQuestionNumber = gameState.played + 1;

  return (
    <ContContext.Provider value={contextValue}>
      <div className="App">
        <div className="quiz-wrapper">
          <QuizHeader 
            currentQuestion={!gameState.showResult ? currentQuestionNumber : undefined}
            totalQuestions={!gameState.showResult ? TOTAL_QUESTIONS : undefined}
            score={!gameState.showResult ? gameState.point : undefined}
          />
          
          {!gameState.showResult && (
            <ProgressBar 
              current={currentQuestionNumber}
              total={TOTAL_QUESTIONS}
            />
          )}
          
          <GameContent 
            showResult={gameState.showResult} 
            point={gameState.point}
            currentQuestion={currentQuestionNumber}
            totalQuestions={TOTAL_QUESTIONS}
            score={gameState.point}
          />
        </div>
      </div>
    </ContContext.Provider>
  );
}

export default App;