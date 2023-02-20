import { SummaryCard, SummaryContainer } from './styles'
import {
  ArrowCircleUp,
  ArrowCircleDown,
  CurrencyCircleDollar,
} from 'phosphor-react'
import { priceFormater } from '../../Utils/formatter'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {
  const summary = useSummary()
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size="28" color="#00b37e" />
        </header>
        <strong>{priceFormater.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size="28" color="#f75a68" />
        </header>
        <strong>{priceFormater.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyCircleDollar size="28" color="#fff" />
        </header>
        <strong>{priceFormater.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
