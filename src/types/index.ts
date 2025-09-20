// ===== Model =====
export interface AppHeaderProps {
  title?: string;
  icon?: string;
  iconAlt?: string;
}
export interface GameContentProps {
  showResult: boolean;
  point: number;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export interface Country {
  name: { common: string };
  area?: number;
  population?: number;
  continents?: string[];
  subregion?: string;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
  borders?: string[];
  cca3: string;
  latlng?: [number, number];
}

export interface ContContextType {
  option: number[];
  setOption: React.Dispatch<React.SetStateAction<number[]>>;
  data: Country[];
  setCont: React.Dispatch<React.SetStateAction<number>>;
  cont: number;
  questionPosition: number;
  setQuestionPosition: React.Dispatch<React.SetStateAction<number>>;
  played: number;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayed: React.Dispatch<React.SetStateAction<number>>;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  continents: string[];
  languages: string[];
  subregions: string[];
  currencies: string[];
}

export interface OptionButtonProps {
  index: number;
  text: string;
  isChosen: boolean;
  isCorrect: boolean;
  answered: boolean;
  onClick: () => void;
}

export interface TimerProps {
  timeLeft: number;
}

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export interface ProgressBarProps {
  current: number;
  total: number;
  showStats?: boolean;
}

export interface AskingProps {
  countries: Country[];
  value: number;
  pos: number;
  traslate: (key: string, obj?: Record<string, any>) => string;
}

export interface QuizHeaderProps {
  title?: string;
  subtitle?: string;
  currentQuestion?: number;
  totalQuestions?: number;
  score?: number;
}

export interface QuestionTypeProps {
  type: number;
  className?: string;
}

export type QuestionType = 2 | 3 | 4 | 5 | 6 | 7 | 9;

export interface ResultProps {
  point: number;
}

export interface ActionButtonsProps {
  onRestart: () => void;
  onReview?: () => void;
  t: (key: string) => string;
}

export interface UseQuestionLogicProps {
  cont: number;
  questionPosition: number;
  data: Country[];
  continents: string[];
  languages: string[];
  subregions: string[];
  currencies: string[];
}

export interface ScoreInfoProps {
  point: number;
  total: number;
  t: (key: string) => string;
}