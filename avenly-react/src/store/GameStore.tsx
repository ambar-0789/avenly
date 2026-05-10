import React, { createContext, useContext, useState, useCallback } from 'react';

interface GameState {
  score: number;
  level: number;
  streak: number;
  multiplier: number;
  focusScore: number; // 0 to 100
  isPaused: boolean;
  engagementState: 'engaged' | 'distracted' | 'idle';
  unlockedModes: string[];
}

interface GameContextType {
  state: GameState;
  addScore: (points: number) => void;
  updateFocus: (score: number) => void;
  setPaused: (paused: boolean) => void;
  setEngagement: (state: GameState['engagementState']) => void;
  resetStreak: () => void;
  unlockMode: (mode: string) => void;
}

const initialState: GameState = {
  score: 0,
  level: 1,
  streak: 0,
  multiplier: 1,
  focusScore: 100,
  isPaused: false,
  engagementState: 'engaged',
  unlockedModes: ['fraction-blaster'],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(initialState);

  const addScore = useCallback((points: number) => {
    setState(prev => {
      const newStreak = prev.streak + 1;
      const newMultiplier = Math.min(5, 1 + Math.floor(newStreak / 5) * 0.5);
      return {
        ...prev,
        score: prev.score + points * prev.multiplier,
        streak: newStreak,
        multiplier: newMultiplier,
      };
    });
  }, []);

  const updateFocus = useCallback((score: number) => {
    setState(prev => ({ ...prev, focusScore: score }));
  }, []);

  const setPaused = useCallback((paused: boolean) => {
    setState(prev => ({ ...prev, isPaused: paused }));
  }, []);

  const setEngagement = useCallback((engagementState: GameState['engagementState']) => {
    setState(prev => ({ ...prev, engagementState }));
  }, []);

  const resetStreak = useCallback(() => {
    setState(prev => ({ ...prev, streak: 0, multiplier: 1 }));
  }, []);

  const unlockMode = useCallback((mode: string) => {
    setState(prev => ({
      ...prev,
      unlockedModes: prev.unlockedModes.includes(mode) 
        ? prev.unlockedModes 
        : [...prev.unlockedModes, mode]
    }));
  }, []);

  return (
    <GameContext.Provider value={{ state, addScore, updateFocus, setPaused, setEngagement, resetStreak, unlockMode }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
