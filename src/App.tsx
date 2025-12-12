// App.tsx - Atualizado com nova estrutura
import React, { createContext, useMemo, useEffect } from "react";
import Question from "./component/Question/Question.tsx";
import OptionAnswer from "./component/OptionAnswer/OptionAnswer.tsx";
import Result from "./component/Result/Result.tsx";
import { QuizHeader } from "./component/QuizHeader/QuizHeader.tsx";
import { ProgressBar } from "./component/ProgressBar/ProgressBar.tsx";
import { NavigationMenu } from "./component/NavigationMenu/NavigationMenu.tsx";
import { LandingPage } from "./Pages/LandingPage/LandingPage.tsx";
import { LoginPage } from "./Pages/LoginPage/LoginPage.tsx";
import { DailyChallengeePage } from "./Pages/DailyChallengeePage/DailyChallengeePage.tsx";
import { LeaderboardPage } from "./Pages/LeaderboardPage/LeaderboardPage.tsx";
import { LearningModePage } from "./Pages/LearningModePage/LearningModePage.tsx";
import { DemoCompletedModal } from "./Pages/DemoCompletedModal/DemoCompletedModal.tsx";
import { useTranslation } from "react-i18next";
import { GameContentProps, ContContextType } from "./types/index.ts";
import { useRouter } from "./hooks/UseRouter.ts";
import { useDemoMode } from "./hooks/useDemoMode.ts";
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
const DEMO_QUESTIONS = 3; // Limitamos demo a 3 perguntas

const GameContent: React.FC<GameContentProps & { isDemoMode?: boolean }> = ({ 
  showResult, 
  point,
  isDemoMode = false
}) => {
  if (showResult) {
    return <Result point={point} isDemoMode={isDemoMode} />;
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
  const { currentRoute, navigateTo, goBack, resetToLanding } = useRouter();
  const { 
    isDemoMode, 
    demoCompleted, 
    showDemoModal, 
    startDemo, 
    completDemo, 
    exitDemo, 
    closeDemoModal 
  } = useDemoMode();

  const [timeLeft, setTimeLeft] = React.useState<number>(15);
  const [answered, setAnswered] = React.useState<boolean>(false);

  // Determina o total de perguntas baseado no modo
  const totalQuestions = isDemoMode ? DEMO_QUESTIONS : TOTAL_QUESTIONS;
  const currentQuestionNumber = gameState.played + 1;

  // Verifica se o demo foi completado
  useEffect(() => {
    if (isDemoMode && gameState.showResult && !demoCompleted) {
      completDemo();
    }
  }, [isDemoMode, gameState.showResult, demoCompleted, completDemo]);

  const contextValue = useMemo<ContContextType>(() => ({
    ...gameState,
    ...gameData,
    timeLeft,
    setTimeLeft,
    answered,
    setAnswered,
    continents: CONTINENTS,
    t,
    isDemoMode,
    totalQuestions
  }), [gameState, gameData, timeLeft, answered, t, isDemoMode, totalQuestions]);

  // Handlers para landing page
  const handlePlayDemo = () => {
    startDemo();
    gameState.resetGame(); // Reset do jogo para o demo
    navigateTo('demo');
  };

  const handleNavigateToLogin = () => {
    navigateTo('login');
  };

  // Handlers para modal de demo
  const handleDemoCreateAccount = () => {
    closeDemoModal();
    exitDemo();
    navigateTo('login');
  };

  const handleDemoPlayAgain = () => {
    closeDemoModal();
    gameState.resetGame();
    // Continua no modo demo
  };

  const handleDemoClose = () => {
    closeDemoModal();
    exitDemo();
    resetToLanding();
  };

  // Renderizar diferentes páginas baseado na rota atual
  const renderContent = () => {
    switch (currentRoute) {
      case 'landing':
        return (
          <LandingPage 
            onPlayDemo={handlePlayDemo}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      
      case 'login':
        return <LoginPage onBack={goBack} />;
      
      case 'daily-challenge':
        return <DailyChallengeePage onBack={goBack} />;
      
      case 'leaderboard':
        return <LeaderboardPage onBack={goBack} />;
      
      case 'learning-mode':
        return <LearningModePage onBack={goBack} />;
      
      case 'demo':
      case 'home':
        return (
          <div className="quiz-wrapper">
            <QuizHeader 
              currentQuestion={!gameState.showResult ? currentQuestionNumber : undefined}
              totalQuestions={!gameState.showResult ? totalQuestions : undefined}
              score={!gameState.showResult ? gameState.point : undefined}
              isDemoMode={isDemoMode}
            />
            
            {!gameState.showResult && (
              <ProgressBar 
                current={currentQuestionNumber}
                total={totalQuestions}
              />
            )}
            
            <GameContent 
              showResult={gameState.showResult} 
              point={gameState.point}
              currentQuestion={currentQuestionNumber}
              totalQuestions={totalQuestions}
              score={gameState.point}
              isDemoMode={isDemoMode}
            />
          </div>
        );
      
      default:
        return renderContent();
    }
  };

  return (
    <ContContext.Provider value={contextValue}>
      <div className="App">
        {/* Menu de navegação - oculto na landing page */}
        {currentRoute !== 'landing' && (
          <NavigationMenu onNavigate={navigateTo} />
        )}
        
        {/* Conteúdo dinâmico baseado na rota */}
        {renderContent()}
        
        {/* Modal de demo completado */}
        <DemoCompletedModal
          isOpen={showDemoModal}
          onClose={handleDemoClose}
          onCreateAccount={handleDemoCreateAccount}
          onPlayAgain={handleDemoPlayAgain}
          score={gameState.point}
          totalQuestions={DEMO_QUESTIONS}
        />
      </div>
    </ContContext.Provider>
  );
}

export default App;

// types/index.ts - Atualizado com novos tipos
export interface GameContentProps {
  showResult: boolean;
  point: number;
  currentQuestion?: number;
  totalQuestions?: number;
  score?: number;
  isDemoMode?: boolean;
}

export interface ContContextType {
  // ... tipos existentes ...
  isDemoMode?: boolean;
  totalQuestions?: number;
  // ... resto dos tipos ...
}