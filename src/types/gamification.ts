export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
  category: 'usage' | 'exploration' | 'streak' | 'special';
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly';
  target: number;
  progress: number;
  completed: boolean;
  xp: number;
  icon: string;
}

export interface UserStats {
  totalSearches: number;
  totalDocumentsOpened: number;
  totalCopies: number;
  totalShares: number;
  averageRelevance: number;
  timeSavedMinutes: number;
  streak: number;
  areasExplored: string[];
}

export interface GamificationState {
  user: User | null;
  xp: number;
  level: number;
  badges: Badge[];
  missions: Mission[];
  stats: UserStats;
  leaderboard: LeaderboardEntry[];
  optInLeaderboard: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userAlias: string;
  xp: number;
  level: number;
}

export type XPAction = 
  | 'search'
  | 'open'
  | 'copy'
  | 'save'
  | 'share'
  | 'context'
  | 'petition'
  | 'sentence'
  | 'raiox'
  | 'mission_complete';

export interface XPGainEvent {
  action: XPAction;
  amount: number;
  timestamp: string;
}