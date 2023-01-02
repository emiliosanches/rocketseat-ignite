import { Cycle } from "./reducer";

export enum ActionType {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  MARK_CYCLE_AS_FINISHED = "MARK_CYCLE_AS_FINISHED",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionType.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function markCycleAsFinishedAction(cycleId: string | null) {
  return {
    type: ActionType.MARK_CYCLE_AS_FINISHED,
    payload: {
      cycleId,
    },
  };
}

export function interruptCycleAction(cycleId: string | null) {
  return {
    type: ActionType.INTERRUPT_CYCLE,
    payload: {
      cycleId,
    },
  };
}
