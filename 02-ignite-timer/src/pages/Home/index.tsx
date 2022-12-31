import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from "react";

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ter no mínimo 5 minutos")
    .max(60, "O ciclo precisa ter no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startTime: number;
  interruptedAt?: Date;
  finishedAt?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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
          (new Date().getTime() - activeCycle.startTime) / 1000
        );

        if (elapsedTime >= totalSeconds) {
          setActiveCycleId(null);
          setCycles((prev) =>
            prev.map((cycle) => {
              if (cycle.id === activeCycleId)
                return { ...cycle, finishedAt: new Date() };
              else return cycle;
            })
          );

          setSecondsPassedAmount(totalSeconds);
          clearInterval(interval);
        } else setSecondsPassedAmount(elapsedTime);
      }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  useEffect(() => {
    if (activeCycle) document.title = `${minutesDisplay}:${secondsDisplay}`;
  }, [minutesDisplay, secondsDisplay]);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startTime: new Date().getTime(),
    };

    setCycles((prev) => [...prev, newCycle]);
    setActiveCycleId(newCycle.id);

    setSecondsPassedAmount(0);

    reset();
  }

  function handleInterruptCycle() {
    setActiveCycleId(null);
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId)
          return { ...cycle, interruptedAt: new Date() };
        else return cycle;
      })
    );
  }

  const isSubmitDisabled = !watch("task");

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", {
              valueAsNumber: true,
            })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutesDisplay[0]}</span>
          <span>{minutesDisplay[1]}</span>
          <Separator>:</Separator>
          <span>{secondsDisplay[0]}</span>
          <span>{secondsDisplay[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
