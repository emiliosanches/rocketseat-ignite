import { ArrowCircleUp, ArrowCircleDown, CurrencyCircleDollar } from 'phosphor-react';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { priceFormatter } from '../../utils/formatter';

import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price;
      } else {
        acc.outcome += transaction.price;
      }

      acc.total = acc.income - acc.outcome;

      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );

  return (
    <SummaryContainer>
      <SummaryCard iconColor='green-300'>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32}/>
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard iconColor='red-300'>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32}/>
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard iconColor='white' backgroundColor='green-700'>
        <header>
          <span>Total</span>
          <CurrencyCircleDollar size={32}/>
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}