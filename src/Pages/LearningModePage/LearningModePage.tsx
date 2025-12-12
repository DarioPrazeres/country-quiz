// pages/LearningModePage.tsx - Página Learning Mode
import React, { useState } from 'react';
import { BasePage } from '../../component/BasePage/BasePage.tsx';

interface LearningModePageProps {
  onBack: () => void;
}

interface LearningTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionsCount: number;
  estimatedTime: string;
  completed: boolean;
  progress: number;
  category: string;
}

export const LearningModePage: React.FC<LearningModePageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const learningTopics: LearningTopic[] = [
    {
      id: '1',
      title: 'World Capitals',
      description: 'Learn capitals of all countries around the world',
      icon: '🏛️',
      difficulty: 'Beginner',
      questionsCount: 50,
      estimatedTime: '15 min',
      completed: true,
      progress: 100,
      category: 'Geography'
    },
    {
      id: '2',
      title: 'European Flags',
      description: 'Master all European country flags and their meanings',
      icon: '🇪🇺',
      difficulty: 'Intermediate',
      questionsCount: 35,
      estimatedTime: '12 min',
      completed: false,
      progress: 65,
      category: 'Flags'
    },
    {
      id: '3',
      title: 'Asian Countries',
      description: 'Explore Asian geography, from borders to regions',
      icon: '🌏',
      difficulty: 'Advanced',
      questionsCount: 40,
      estimatedTime: '18 min',
      completed: false,
      progress: 25,
      category: 'Geography'
    },
    {
      id: '4',
      title: 'World Currencies',
      description: 'Learn about different currencies used worldwide',
      icon: '💰',
      difficulty: 'Intermediate',
      questionsCount: 45,
      estimatedTime: '16 min',
      completed: false,
      progress: 0,
      category: 'Economics'
    },
    {
      id: '5',
      title: 'African Languages',
      description: 'Discover the diverse languages spoken across Africa',
      icon: '🗣️',
      difficulty: 'Advanced',
      questionsCount: 30,
      estimatedTime: '20 min',
      completed: false,
      progress: 10,
      category: 'Culture'
    },
    {
      id: '6',
      title: 'South American Borders',
      description: 'Study which countries border each other in South America',
      icon: '🗾',
      difficulty: 'Beginner',
      questionsCount: 25,
      estimatedTime: '10 min',
      completed: false,
      progress: 0,
      category: 'Geography'
    }
  ];

  const categories = ['all', ...Array.from(new Set(learningTopics.map(topic => topic.category)))];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredTopics = learningTopics.filter(topic => {
    const categoryMatch = selectedCategory === 'all' || topic.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'yellow';
      case 'Advanced': return 'red';
      default: return 'gray';
    }
  };

  const handleStartTopic = (topicId: string) => {
    console.log('Starting learning topic:', topicId);
  };

  return (
    <BasePage
      title="Learning Mode"
      subtitle="Practice without pressure, learn at your own pace"
      icon="📚"
      onBack={onBack}
    >
      <div className="learning-mode-container">
        {/* Learning Stats */}
        <div className="learning-stats">
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <div className="stat-number">1</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <div className="stat-number">5</div>
                <div className="stat-label">In Progress</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <div className="stat-number">2.5h</div>
                <div className="stat-label">Time Spent</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-number">85%</div>
                <div className="stat-label">Avg Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="learning-filters">
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select 
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Difficulty</label>
            <select 
              className="filter-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Learning Topics */}
        <div className="learning-topics">
          <div className="topics-grid">
            {filteredTopics.map(topic => (
              <div key={topic.id} className="topic-card">
                <div className="topic-header">
                  <div className="topic-icon">{topic.icon}</div>
                  <div className="topic-meta">
                    <div className={`difficulty-badge difficulty-badge--${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </div>
                    <div className="category-tag">{topic.category}</div>
                  </div>
                </div>

                <div className="topic-content">
                  <h3 className="topic-title">{topic.title}</h3>
                  <p className="topic-description">{topic.description}</p>
                </div>

                <div className="topic-info">
                  <div className="info-item">
                    <span className="info-icon">📝</span>
                    <span>{topic.questionsCount} questions</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">⏱️</span>
                    <span>{topic.estimatedTime}</span>
                  </div>
                </div>

                {topic.progress > 0 && (
                  <div className="topic-progress">
                    <div className="progress-info">
                      <span>Progress</span>
                      <span>{topic.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="topic-actions">
                  <button
                    className={`topic-button ${topic.completed ? 'topic-button--completed' : 'topic-button--start'}`}
                    onClick={() => handleStartTopic(topic.id)}
                  >
                    {topic.completed ? (
                      <>
                        <span className="button-icon">✓</span>
                        Completed
                      </>
                    ) : topic.progress > 0 ? (
                      <>
                        <span className="button-icon">▶</span>
                        Continue
                      </>
                    ) : (
                      <>
                        <span className="button-icon">🚀</span>
                        Start Learning
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="learning-tips">
          <h3>Learning Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🧠</div>
              <div className="tip-content">
                <h4>Spaced Learning</h4>
                <p>Review topics regularly to improve long-term retention</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <div className="tip-content">
                <h4>Focus on Weak Areas</h4>
                <p>Spend more time on topics with lower accuracy scores</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📊</div>
              <div className="tip-content">
                <h4>Track Progress</h4>
                <p>Monitor your improvement across different categories</p>
              </div>
            </div>
            <div className="tip-card">
              <div className="tip-icon">⚡</div>
              <div className="tip-content">
                <h4>No Pressure</h4>
                <p>Take your time - there are no timers in learning mode</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="learning-achievements">
          <h3>Learning Achievements</h3>
          <div className="achievements-grid">
            {[
              { icon: '🎓', name: 'Scholar', description: 'Complete 5 learning topics', unlocked: false },
              { icon: '🌟', name: 'Perfect Study', description: 'Get 100% on any topic', unlocked: true },
              { icon: '📚', name: 'Bookworm', description: 'Study for 10 hours total', unlocked: false },
              { icon: '🏆', name: 'Learning Master', description: 'Complete all topics', unlocked: false }
            ].map((achievement, index) => (
              <div key={index} className={`achievement-card ${achievement.unlocked ? 'achievement-card--unlocked' : 'achievement-card--locked'}`}>
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <div className="achievement-name">{achievement.name}</div>
                  <div className="achievement-description">{achievement.description}</div>
                </div>
                {achievement.unlocked && <div className="achievement-status">✓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BasePage>
  );
};