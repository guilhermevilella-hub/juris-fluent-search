import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GamificationState, XPAction, Badge, Mission } from '@/types/gamification';
import { useToast } from '@/hooks/use-toast';

interface GamificationContextType extends GamificationState {
  addXP: (action: XPAction, customAmount?: number) => void;
  updateMissionProgress: (missionId: string, increment?: number) => void;
  completeMission: (missionId: string) => void;
  unlockBadge: (badgeId: string) => void;
  toggleLeaderboardOptIn: () => void;
}

const initialState: GamificationState = {
  user: { id: '1', name: 'João Silva', email: 'joao.silva@email.com' },
  xp: 156,
  level: 2,
  badges: [],
  missions: [],
  stats: {
    totalSearches: 47,
    totalDocumentsOpened: 23,
    totalCopies: 15,
    totalShares: 8,
    averageRelevance: 87,
    timeSavedMinutes: 142,
    streak: 3,
    areasExplored: ['Consumidor', 'Civil', 'Família']
  },
  leaderboard: [],
  optInLeaderboard: false
};

const XP_VALUES: Record<XPAction, number> = {
  search: 1,
  open: 2,
  copy: 4,
  save: 2,
  share: 3,
  context: 6,
  petition: 6,
  sentence: 6,
  raiox: 6,
  mission_complete: 8
};

const LEVEL_THRESHOLDS = [0, 50, 120, 240, 420, 680, 980, 1320, 1700, 2120, 2580];

function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i;
    }
  }
  return 0;
}

function getXPForNextLevelInternal(level: number): number {
  return LEVEL_THRESHOLDS[level + 1] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 300;
}

type GamificationAction = 
  | { type: 'ADD_XP'; payload: { action: XPAction; amount: number } }
  | { type: 'UPDATE_MISSION_PROGRESS'; payload: { missionId: string; increment: number } }
  | { type: 'COMPLETE_MISSION'; payload: { missionId: string } }
  | { type: 'UNLOCK_BADGE'; payload: { badgeId: string } }
  | { type: 'TOGGLE_LEADERBOARD_OPT_IN' }
  | { type: 'INIT_DATA'; payload: GamificationState };

function gamificationReducer(state: GamificationState, action: GamificationAction): GamificationState {
  switch (action.type) {
    case 'ADD_XP': {
      const newXP = state.xp + action.payload.amount;
      const newLevel = calculateLevel(newXP);
      
      return {
        ...state,
        xp: newXP,
        level: newLevel,
        stats: {
          ...state.stats,
          [`total${action.payload.action === 'search' ? 'Searches' : 
             action.payload.action === 'open' ? 'DocumentsOpened' :
             action.payload.action === 'copy' ? 'Copies' : 'Shares'}`]: 
            (state.stats as any)[`total${action.payload.action === 'search' ? 'Searches' : 
             action.payload.action === 'open' ? 'DocumentsOpened' :
             action.payload.action === 'copy' ? 'Copies' : 'Shares'}`] + 1
        }
      };
    }
    
    case 'UPDATE_MISSION_PROGRESS': {
      return {
        ...state,
        missions: state.missions.map(mission => 
          mission.id === action.payload.missionId
            ? { ...mission, progress: Math.min(mission.progress + action.payload.increment, mission.target) }
            : mission
        )
      };
    }
    
    case 'COMPLETE_MISSION': {
      return {
        ...state,
        missions: state.missions.map(mission => 
          mission.id === action.payload.missionId
            ? { ...mission, completed: true }
            : mission
        )
      };
    }
    
    case 'UNLOCK_BADGE': {
      return {
        ...state,
        badges: state.badges.map(badge =>
          badge.id === action.payload.badgeId
            ? { ...badge, earned: true, earnedAt: new Date().toISOString() }
            : badge
        )
      };
    }
    
    case 'TOGGLE_LEADERBOARD_OPT_IN': {
      return {
        ...state,
        optInLeaderboard: !state.optInLeaderboard
      };
    }
    
    case 'INIT_DATA': {
      return action.payload;
    }
    
    default:
      return state;
  }
}

const GamificationContext = createContext<GamificationContextType | null>(null);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gamificationReducer, initialState);
  const { toast } = useToast();

  // Initialize with mock data including badges and missions
  useEffect(() => {
    const mockBadges: Badge[] = [
      {
        id: 'primeira-copia',
        name: 'Primeira Cópia',
        description: 'Copiou sua primeira jurisprudência',
        icon: '📋',
        earned: true,
        earnedAt: '2024-01-10T10:00:00Z',
        category: 'usage'
      },
      {
        id: 'maratonista',
        name: 'Maratonista',
        description: '50 decisões abertas',
        icon: '🏃‍♂️',
        earned: false,
        category: 'usage'
      },
      {
        id: 'cirurgico',
        name: 'Cirúrgico',
        description: '10 cópias em um único dia',
        icon: '⚡',
        earned: false,
        category: 'streak'
      },
      {
        id: 'explorador',
        name: 'Explorador',
        description: 'Usou todos os quatro modos de busca',
        icon: '🗺️',
        earned: false,
        category: 'exploration'
      }
    ];

    const mockMissions: Mission[] = [
      {
        id: 'abrir-decisoes',
        name: 'Abra 5 decisões hoje',
        description: 'Explore jurisprudências relevantes',
        type: 'daily',
        target: 5,
        progress: 2,
        completed: false,
        xp: 8,
        icon: '👁️'
      },
      {
        id: 'usar-contexto',
        name: 'Use "Pesquisa por Contexto" 1 vez',
        description: 'Experimente nossa busca inteligente',
        type: 'daily',
        target: 1,
        progress: 0,
        completed: false,
        xp: 8,
        icon: '🔍'
      },
      {
        id: 'copiar-semanal',
        name: 'Copie 12 ementas esta semana',
        description: 'Construa seu arsenal jurídico',
        type: 'weekly',
        target: 12,
        progress: 4,
        completed: false,
        xp: 25,
        icon: '📚'
      }
    ];

    dispatch({
      type: 'INIT_DATA',
      payload: {
        ...initialState,
        badges: mockBadges,
        missions: mockMissions
      }
    });
  }, []);

  const addXP = (action: XPAction, customAmount?: number) => {
    const amount = customAmount || XP_VALUES[action];
    const oldLevel = state.level;
    
    dispatch({ type: 'ADD_XP', payload: { action, amount } });
    
    // Check for level up
    const newXP = state.xp + amount;
    const newLevel = calculateLevel(newXP);
    
    if (newLevel > oldLevel) {
      toast({
        title: `🎉 Você subiu para o Nível ${newLevel}!`,
        description: `Continue — faltam ${getXPForNextLevelInternal(newLevel) - newXP} XP para o próximo nível.`,
        duration: 4000,
      });
    }

    // Show XP gain feedback
    const actionMessages: Record<XPAction, string> = {
      search: 'Busca realizada',
      open: 'Decisão aberta',
      copy: 'Ementa copiada',
      save: 'Documento salvo',
      share: 'Conteúdo compartilhado',
      context: 'Busca por contexto',
      petition: 'Análise de petição',
      sentence: 'Análise de sentença',
      raiox: 'Raio-X realizado',
      mission_complete: 'Missão completa'
    };

    if (action === 'copy') {
      toast({
        title: `Copiado! +${amount} XP`,
        description: 'Você economizou ~12min de trabalho',
        duration: 2000,
      });
    }
  };

  const updateMissionProgress = (missionId: string, increment = 1) => {
    dispatch({ type: 'UPDATE_MISSION_PROGRESS', payload: { missionId, increment } });
    
    const mission = state.missions.find(m => m.id === missionId);
    if (mission && mission.progress + increment >= mission.target && !mission.completed) {
      completeMission(missionId);
    }
  };

  const completeMission = (missionId: string) => {
    const mission = state.missions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    dispatch({ type: 'COMPLETE_MISSION', payload: { missionId } });
    addXP('mission_complete', mission.xp);

    toast({
      title: '🎯 Missão completa!',
      description: `${mission.name} • +${mission.xp} XP`,
      duration: 3000,
    });
  };

  const unlockBadge = (badgeId: string) => {
    const badge = state.badges.find(b => b.id === badgeId);
    if (!badge || badge.earned) return;

    dispatch({ type: 'UNLOCK_BADGE', payload: { badgeId } });

    toast({
      title: `🏆 Novo badge: ${badge.name}!`,
      description: badge.description,
      duration: 4000,
    });
  };

  const toggleLeaderboardOptIn = () => {
    dispatch({ type: 'TOGGLE_LEADERBOARD_OPT_IN' });
  };

  return (
    <GamificationContext.Provider 
      value={{
        ...state,
        addXP,
        updateMissionProgress,
        completeMission,
        unlockBadge,
        toggleLeaderboardOptIn
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}

export function getXPForNextLevel(level: number): number {
  return LEVEL_THRESHOLDS[level + 1] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 300;
}

export function getXPProgress(currentXP: number, level: number): { current: number; target: number; percentage: number } {
  const currentLevelXP = LEVEL_THRESHOLDS[level] || 0;
  const nextLevelXP = getXPForNextLevel(level);
  const current = currentXP - currentLevelXP;
  const target = nextLevelXP - currentLevelXP;
  const percentage = (current / target) * 100;

  return { current, target, percentage };
}