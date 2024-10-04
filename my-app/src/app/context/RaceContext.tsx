'use client'
import { createContext, useState, ReactNode, useContext } from 'react';

interface RaceContextType {
  races: any[];
  setRaces: (races: any[]) => void;
}

const RaceContext = createContext<RaceContextType | undefined>(undefined);

export function useRaceContext() {
  const context = useContext(RaceContext);
  if (!context) {
    throw new Error('useRaceContext must be used within a RaceProvider');
  }
  return context;
}

export function RaceProvider({ children }: { children: ReactNode }) {
  const [races, setRaces] = useState<any[]>([]);

  return (
    <RaceContext.Provider value={{ races, setRaces }}>
      {children}
    </RaceContext.Provider>
  );
}
