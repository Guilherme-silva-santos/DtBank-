import { ThemeProvider } from 'styled-components'
import { TransactionProvider } from './Contexts/TransactionsContext'
import { Transactions } from './pages/Transactions'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <TransactionProvider>
        <Transactions />
      </TransactionProvider>
    </ThemeProvider>
  )
}
