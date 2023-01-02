import { Cycle } from "../../contexts/CyclesContext";
import { ActionType } from "./actions";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
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
