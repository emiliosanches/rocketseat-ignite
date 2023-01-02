import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionType, cyclesReducer } from "../reducer/cycles";

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

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    { cycles: [], activeCycleId: null }
  );
  
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0);
  
  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function updateSecondsPassedAmount(amount: number) {
    setSecondsPassedAmount(amount);
  }

  function markActiveCycleAsFinished() {
    dispatch({
      type: ActionType.MARK_CYCLE_AS_FINISHED,
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
      type: ActionType.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });

    setSecondsPassedAmount(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionType.INTERRUPT_CYCLE,
      payload: {
        cycleId: activeCycleId,
      },
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles: cycles,
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
