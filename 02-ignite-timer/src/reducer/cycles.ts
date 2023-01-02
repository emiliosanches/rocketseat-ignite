import { Cycle } from "../contexts/CyclesContext";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export enum ActionType {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  MARK_CYCLE_AS_FINISHED = 'MARK_CYCLE_AS_FINISHED',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE'
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionType.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case ActionType.MARK_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === action.payload.cycleId) {
            return { ...cycle, finishedAt: new Date() };
          }
          return cycle;
        }),
        activeCycleId: null,
      };
    case ActionType.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === action.payload.cycleId) {
            return { ...cycle, interruptedAt: new Date() };
          }
          return cycle;
        }),
        activeCycleId: null,
      };
  }

  return state;
}
