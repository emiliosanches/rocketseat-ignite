import { useContext, useEffect } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markActiveCycleAsFinished,
    secondsPassedAmount,
    updateSecondsPassedAmount,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - secondsPassedAmount : 0;

  const minutesInTimer = Math.floor(currentSeconds / 60);
  const secondsInTimer = currentSeconds % 60;

  const minutesDisplay = minutesInTimer.toString().padStart(2, "0");
  const secondsDisplay = secondsInTimer.toString().padStart(2, "0");

  useEffect(() => {
    let interval: number;

    if (activeCycle)
      interval = setInterval(() => {
        const elapsedTime = Math.floor(
          (new Date().getTime() - activeCycle.startTime.getTime()) / 1000
        );

        if (elapsedTime >= totalSeconds) {
          markActiveCycleAsFinished();

          updateSecondsPassedAmount(totalSeconds);
          clearInterval(interval);
        } else updateSecondsPassedAmount(elapsedTime);
      }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markActiveCycleAsFinished,
    updateSecondsPassedAmount,
  ]);

  useEffect(() => {
    if (activeCycle) document.title = `${minutesDisplay}:${secondsDisplay}`;
  }, [minutesDisplay, secondsDisplay]);

  return (
    <CountdownContainer>
      <span>{minutesDisplay[0]}</span>
      <span>{minutesDisplay[1]}</span>
      <Separator>:</Separator>
      <span>{secondsDisplay[0]}</span>
      <span>{secondsDisplay[1]}</span>
    </CountdownContainer>
  );
}