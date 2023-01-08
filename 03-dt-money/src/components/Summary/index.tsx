import { ArrowCircleUp, ArrowCircleDown, CurrencyCircleDollar } from 'phosphor-react';

import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
  return (
    <SummaryContainer>
      <SummaryCard iconColor='green-300'>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32}/>
        </header>

        <strong>R$ 17.400,00</strong>
      </SummaryCard>
      <SummaryCard iconColor='red-300'>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32}/>
        </header>

        <strong>R$ 17.400,00</strong>
      </SummaryCard>
      <SummaryCard iconColor='white' backgroundColor='green-700'>
        <header>
          <span>Total</span>
          <CurrencyCircleDollar size={32}/>
        </header>

        <strong>R$ 17.400,00</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}