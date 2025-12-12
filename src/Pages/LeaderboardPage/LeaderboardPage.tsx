// pages/LeaderboardPage.tsx - Página Leaderboard
import React, { useState, useEffect } from 'react';
import { BasePage } from '../../component/BasePage/BasePage.tsx';

interface LeaderboardPageProps {
  onBack: () => void;
}

interface Player {
  id: string;
  name: string;
  score: number;
  accuracy: number;
  gamesPlayed: number;
  avatar: string;
  country: string;
  streak: number;
  lastActive: string;
}

type LeaderboardType = 'global' | 'weekly' | 'daily' | 'friends';

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('global');
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Player | null>(null);

  useEffect(() => {
    const loadLeaderboardData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockPlayers: Player[] = [
        {
          id: '1',
          name: 'GeoMaster2024',
          score: 15420,
          accuracy: 94.2,
          gamesPlayed: 156,
          avatar: '🌟',
          country: 'Canada',
          streak: 12,
          lastActive: '2 hours ago'
        },
        {
          id: '2',
          name: 'WorldExplorer',
          score: 14890,
          accuracy: 91.8,
          gamesPlayed: 203,
          avatar: '🗺️',
          country: 'Germany',
          streak: 8,
          lastActive: '1 day ago'
        },
        {
          id: '3',
          name: 'CapitalKnower',
          score: 14230,
          accuracy: 89.5,
          gamesPlayed: 178,
          avatar: '🏛️',
          country: 'Japan',
          streak: 15,
          lastActive: '3 hours ago'
        },
        {
          id: '4',
          name: 'FlagHunter',
          score: 13950,
          accuracy: 92.1,
          gamesPlayed: 134,
          avatar: '🏴',
          country: 'Brazil',
          streak: 5,
          lastActive: '6 hours ago'
        },
        {
          id: '5',
          name: 'GeographyGuru',
          score: 13680,
          accuracy: 88.7,
          gamesPlayed: 195,
          avatar: '📍',
          country: 'Australia',
          streak: 7,
          lastActive: '1 hour ago'
        }
      ];

      const mockCurrentUser: Player = {
        id: 'current',
        name: 'You',
        score: 8420,
        accuracy: 85.3,
        gamesPlayed: 89,
        avatar: '👤',
        country: 'Angola',
        streak: 3,
        lastActive: 'Now'
      };

      setPlayers(mockPlayers);
      setCurrentUser(mockCurrentUser);
      setIsLoading(false);
    };

    loadLeaderboardData();
  }, [activeTab]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'gold';
      case 2: return 'silver';
      case 3: return 'bronze';
      default: return 'default';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <BasePage
      title="Leaderboard"
      subtitle="See how you rank against other players worldwide"
      icon="📊"
      onBack={onBack}
    >
      <div className="leaderboard-container">
        {/* Tabs */}
        <div className="leaderboard-tabs">
          {[
            { key: 'global', label: 'Global', icon: '🌍' },
            { key: 'weekly', label: 'Weekly', icon: '📅' },
            { key: 'daily', label: 'Daily', icon: '⏰' },
            { key: 'friends', label: 'Friends', icon: '👥' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`tab-button ${activeTab === tab.key ? 'tab-button--active' : ''}`}
              onClick={() => setActiveTab(tab.key as LeaderboardType)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Current User Position */}
        {currentUser && (
          <div className="current-user-card">
            <div className="user-position">
              <div className="position-rank">#47</div>
              <div className="position-info">Your Position</div>
            </div>
            <div className="user-info">
              <div className="user-avatar">{currentUser.avatar}</div>
              <div className="user-details">
                <div className="user-name">{currentUser.name}</div>
                <div className="user-stats">
                  {currentUser.score} pts • {currentUser.accuracy}% accuracy
                </div>
              </div>
            </div>
            <div className="user-streak">
              <div className="streak-icon">🔥</div>
              <div className="streak-number">{currentUser.streak}</div>
            </div>
          </div>
        )}

        {/* Leaderboard List */}
        <div className="leaderboard-list">
          {isLoading ? (
            <div className="leaderboard-loading">
              <div className="loading-spinner"></div>
              <p>Loading leaderboard...</p>
            </div>
          ) : (
            players.map((player, index) => {
              const rank = index + 1;
              return (
                <div
                  key={player.id}
                  className={`leaderboard-item rank-${getRankColor(rank)}`}
                >
                  <div className="player-rank">
                    <div className="rank-display">
                      {getRankIcon(rank)}
                    </div>
                  </div>

                  <div className="player-info">
                    <div className="player-avatar">{player.avatar}</div>
                    <div className="player-details">
                      <div className="player-name">{player.name}</div>
                      <div className="player-country">{player.country}</div>
                    </div>
                  </div>

                  <div className="player-stats">
                    <div className="stat-item">
                      <div className="stat-value">{player.score.toLocaleString()}</div>
                      <div className="stat-label">Points</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{player.accuracy}%</div>
                      <div className="stat-label">Accuracy</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{player.gamesPlayed}</div>
                      <div className="stat-label">Games</div>
                    </div>
                  </div>

                  <div className="player-meta">
                    <div className="player-streak">
                      <span className="streak-icon">🔥</span>
                      <span>{player.streak}</span>
                    </div>
                    <div className="last-active">{player.lastActive}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Leaderboard Stats */}
        <div className="leaderboard-stats">
          <h3>Leaderboard Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-number">94.2%</div>
                <div className="stat-description">Top Player Accuracy</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <div className="stat-number">15,420</div>
                <div className="stat-description">Highest Score</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-content">
                <div className="stat-number">2,847</div>
                <div className="stat-description">Active Players</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-content">
                <div className="stat-number">15</div>
                <div className="stat-description">Longest Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="achievement-section">
          <h3>Recent Achievements</h3>
          <div className="achievements-list">
            {[
              { icon: '🥇', name: 'Perfect Score', description: 'Got 100% on a quiz' },
              { icon: '🔥', name: 'Hot Streak', description: '10 day streak' },
              { icon: '🌍', name: 'World Traveler', description: 'Answered 500 questions' },
              { icon: '⚡', name: 'Speed Demon', description: 'Answered in under 3 seconds' }
            ].map((achievement, index) => (
              <div key={index} className="achievement-badge">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <div className="achievement-name">{achievement.name}</div>
                  <div className="achievement-description">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BasePage>
  );
};