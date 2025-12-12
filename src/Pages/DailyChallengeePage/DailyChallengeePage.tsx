import React, { useState, useEffect } from 'react';
import { BasePage } from '../../component/BasePage/BasePage.tsx';

interface DailyChallengePageProps {
  onBack: () => void;
}

interface ChallengeData {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  questions: number;
  reward: number;
  completed: boolean;
  streak: number;
  completedAt?: string;
  score?: string;
}

export const DailyChallengeePage: React.FC<DailyChallengePageProps> = ({ onBack }) => {
  const [todaysChallenge, setTodaysChallenge] = useState<ChallengeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeUntilNext, setTimeUntilNext] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    // Simular carregamento do desafio do dia
    const loadTodaysChallenge = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const today = new Date().toDateString();
      const isCompleted = localStorage.getItem(`challenge-${today}`) === 'completed';
      
      const challenge: ChallengeData = {
        id: 'daily-' + today,
        title: 'African Capitals Master',
        description: 'Test your knowledge of African country capitals. Perfect for geography enthusiasts wanting to explore the diverse continent of Africa.',
        difficulty: 'Medium',
        timeLimit: 10,
        questions: 15,
        reward: 250,
        completed: isCompleted,
        streak: parseInt(localStorage.getItem('challenge-streak') || '3'),
        completedAt: isCompleted ? localStorage.getItem(`challenge-${today}-time`) || undefined : undefined,
        score: isCompleted ? localStorage.getItem(`challenge-${today}-score`) || undefined : undefined
      };
      
      setTodaysChallenge(challenge);
      setIsLoading(false);
    };

    loadTodaysChallenge();
  }, []);

  useEffect(() => {
    // Calcular tempo até próximo desafio
    const updateTimeUntilNext = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilNext(`${hours}h ${minutes}m`);
    };

    updateTimeUntilNext();
    const interval = setInterval(updateTimeUntilNext, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStartChallenge = async () => {
    if (!todaysChallenge) return;
    
    setIsStarting(true);
    
    try {
      // Simular início do desafio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular conclusão do desafio (para demo)
      const today = new Date().toDateString();
      const score = Math.floor(Math.random() * 15) + 1; // Score aleatório
      const completedTime = new Date().toLocaleTimeString();
      
      localStorage.setItem(`challenge-${today}`, 'completed');
      localStorage.setItem(`challenge-${today}-score`, `${score}/15`);
      localStorage.setItem(`challenge-${today}-time`, completedTime);
      
      // Atualizar streak
      const newStreak = todaysChallenge.streak + 1;
      localStorage.setItem('challenge-streak', newStreak.toString());
      
      // Atualizar estado
      setTodaysChallenge(prev => prev ? {
        ...prev,
        completed: true,
        score: `${score}/15`,
        completedAt: completedTime,
        streak: newStreak
      } : null);
      
      alert(`Challenge completed! You scored ${score}/15!`);
      
    } catch (error) {
      console.error('Error starting challenge:', error);
      alert('Failed to start challenge. Please try again.');
    } finally {
      setIsStarting(false);
    }
  };

  const resetChallenge = () => {
    if (!todaysChallenge) return;
    
    const today = new Date().toDateString();
    localStorage.removeItem(`challenge-${today}`);
    localStorage.removeItem(`challenge-${today}-score`);
    localStorage.removeItem(`challenge-${today}-time`);
    
    setTodaysChallenge(prev => prev ? {
      ...prev,
      completed: false,
      score: undefined,
      completedAt: undefined
    } : null);
  };

  if (isLoading) {
    return (
      <BasePage
        title="Daily Challenge"
        subtitle="Loading today's challenge..."
        icon="🏆"
        onBack={onBack}
      >
        <div className="challenge-loading">
          <div className="loading-spinner"></div>
          <p>Preparing your daily challenge...</p>
        </div>
      </BasePage>
    );
  }

  if (!todaysChallenge) {
    return (
      <BasePage
        title="Daily Challenge"
        icon="🏆"
        onBack={onBack}
      >
        <div className="challenge-error">
          <div className="error-icon">⚠️</div>
          <h3>Unable to Load Challenge</h3>
          <p>We couldn't load today's challenge. Please check your connection and try again.</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </BasePage>
    );
  }

  return (
    <BasePage
      title="Daily Challenge"
      subtitle="New challenge every day at midnight"
      icon="🏆"
      onBack={onBack}
    >
      <div className="daily-challenge-container">
        {/* Streak Counter */}
        <div className="streak-counter">
          <div className="streak-info">
            <div className="streak-icon">🔥</div>
            <div className="streak-details">
              <div className="streak-number">{todaysChallenge.streak}</div>
              <div className="streak-label">Day Streak</div>
            </div>
          </div>
          <div className="next-challenge-timer">
            <div className="timer-label">Next challenge in</div>
            <div className="timer-value">{timeUntilNext}</div>
          </div>
        </div>

        {/* Today's Challenge */}
        <div className="challenge-card">
          <div className="challenge-header">
            <div className="challenge-title-section">
              <h2 className="challenge-title">{todaysChallenge.title}</h2>
              <div className="challenge-meta">
                <div className={`difficulty-badge difficulty-badge--${todaysChallenge.difficulty.toLowerCase()}`}>
                  {todaysChallenge.difficulty}
                </div>
                <div className="reward-badge">
                  +{todaysChallenge.reward} XP
                </div>
              </div>
            </div>
          </div>

          <div className="challenge-description">
            <p>{todaysChallenge.description}</p>
          </div>

          <div className="challenge-stats">
            <div className="stat-item">
              <div className="stat-icon">📝</div>
              <div className="stat-info">
                <div className="stat-value">{todaysChallenge.questions}</div>
                <div className="stat-label">Questions</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⏱</div>
              <div className="stat-info">
                <div className="stat-value">{todaysChallenge.timeLimit}s</div>
                <div className="stat-label">Per Question</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <div className="stat-value">100%</div>
                <div className="stat-label">Target</div>
              </div>
            </div>
          </div>

          {todaysChallenge.completed && todaysChallenge.score && (
            <div className="challenge-result">
              <div className="result-header">
                <div className="result-icon">✅</div>
                <h3>Challenge Completed!</h3>
              </div>
              <div className="result-details">
                <div className="result-score">Your score: {todaysChallenge.score}</div>
                <div className="result-time">Completed at: {todaysChallenge.completedAt}</div>
              </div>
            </div>
          )}

          <div className="challenge-actions">
            {todaysChallenge.completed ? (
              <div className="completed-actions">
                <div className="completed-message">
                  <div className="completed-icon">🎉</div>
                  <span>You've completed today's challenge!</span>
                </div>
                <button 
                  className="btn btn-secondary"
                  onClick={resetChallenge}
                >
                  Reset Challenge (Demo)
                </button>
              </div>
            ) : (
              <button 
                className="challenge-start-button"
                onClick={handleStartChallenge}
                disabled={isStarting}
              >
                {isStarting ? (
                  <>
                    <div className="button-spinner"></div>
                    Starting...
                  </>
                ) : (
                  <>
                    <span className="button-icon">🚀</span>
                    Start Challenge
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Previous Challenges */}
        <div className="previous-challenges">
          <h3>Recent Challenges</h3>
          <div className="challenges-list">
            {[
              { date: 'Yesterday', title: 'European Rivers', completed: true, score: '14/15', difficulty: 'Hard' },
              { date: '2 days ago', title: 'Asian Currencies', completed: true, score: '12/15', difficulty: 'Medium' },
              { date: '3 days ago', title: 'South American Flags', completed: false, score: '0/15', difficulty: 'Easy' },
              { date: '4 days ago', title: 'North American Lakes', completed: true, score: '13/15', difficulty: 'Medium' }
            ].map((challenge, index) => (
              <div key={index} className="challenge-history-item">
                <div className="challenge-info">
                  <div className="challenge-date">{challenge.date}</div>
                  <div className="challenge-name">{challenge.title}</div>
                  <div className={`difficulty-mini difficulty-mini--${challenge.difficulty.toLowerCase()}`}>
                    {challenge.difficulty}
                  </div>
                </div>
                <div className="challenge-result">
                  {challenge.completed ? (
                    <span className="score-completed">{challenge.score}</span>
                  ) : (
                    <span className="score-missed">Missed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Tips */}
        <div className="challenge-tips">
          <h3>💡 Pro Tips</h3>
          <div className="tips-grid">
            <div className="tip-item">
              <div className="tip-icon">🎯</div>
              <div className="tip-text">
                <strong>Accuracy over Speed</strong>
                <p>Take your time to think through each question carefully</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">🧠</div>
              <div className="tip-text">
                <strong>Study Patterns</strong>
                <p>Look for geographical and historical connections between countries</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">📅</div>
              <div className="tip-text">
                <strong>Daily Consistency</strong>
                <p>Complete challenges daily to maintain your streak and earn bonus XP</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">🏆</div>
              <div className="tip-text">
                <strong>Challenge Yourself</strong>
                <p>Don't give up if you miss one - tomorrow brings a fresh opportunity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
};