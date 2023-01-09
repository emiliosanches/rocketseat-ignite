import {
  ArrowCircleUp,
  ArrowCircleDown,
  CurrencyCircleDollar,
} from 'phosphor-react'
import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'

import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const { income, outcome, total } = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard iconColor="green-300">
        <header>
          <span>Entradas</span>
          <ArrowCircleUp />
        </header>

        <strong>{priceFormatter.format(income)}</strong>
      </SummaryCard>
      <SummaryCard iconColor="red-300">
        <header>
          <span>Saídas</span>
          <ArrowCircleDown />
        </header>

        <strong>{priceFormatter.format(outcome)}</strong>
      </SummaryCard>
      <SummaryCard iconColor="white" backgroundColor="green-700">
        <header>
          <span>Total</span>
          <CurrencyCircleDollar />
        </header>

        <strong>{priceFormatter.format(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
