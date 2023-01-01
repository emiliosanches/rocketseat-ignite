import { createContext, ReactNode, useReducer, useState } from "react";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startTime: number;
  interruptedAt?: Date;
  finishedAt?: Date;
}

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICyclesContext {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  secondsPassedAmount: number;
  markActiveCycleAsFinished: () => void;
  updateSecondsPassedAmount: (amount: number) => void;
  createNewCycle: (cycle: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as ICyclesContext);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    switch (action.type) {
      case 'ADD_NEW_CYCLE':
        return [...state, action.payload.newCycle]
      case 'MARK_CYCLE_AS_FINISHED':
        return state.map((cycle) => {
          if (cycle.id === action.payload.cycleId) {
            return { ...cycle, finishedAt: new Date() }
          }
          return cycle
        })
      case 'INTERRUPT_CYCLE':
        return state.map((cycle) => {
          if (cycle.id === action.payload.cycleId) {
            return { ...cycle, interruptedAt: new Date() }
          }
          return cycle
        })
    }

    return state;
  }, []);

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function updateSecondsPassedAmount(amount: number) {
    setSecondsPassedAmount(amount);
  }

  function markActiveCycleAsFinished() {
    setActiveCycleId(null);
    dispatch({
      type: "MARK_CYCLE_AS_FINISHED",
      payload: {
        cycleId: activeCycleId,
      },
    });
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startTime: new Date().getTime(),
    };

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    setActiveCycleId(newCycle.id);

    setSecondsPassedAmount(0);
  }

  function interruptCurrentCycle() {
    setActiveCycleId(null);
    dispatch({
      type: "INTERRUPT_CYCLE",
      payload: {
        cycleId: activeCycleId,
      },
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markActiveCycleAsFinished,
        secondsPassedAmount,
        updateSecondsPassedAmount,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}