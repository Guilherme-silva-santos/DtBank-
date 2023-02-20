import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../Contexts/TransactionsContext'
import { useMemo } from 'react'

// criação de um hook
export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  /*
    a function recebe dois parametros acc que é o resumo atual income: 0, 
            outcome: 0, 
            total: 0 
    e outro parametro neste caso são as transações
    o metodo reduce permite que percorramos um array e fazer com que esse array seja reduzido a alguma nova
    estrutura de dados.

    neste caso o array de transactions sera convertido em um objeto que seguira a seguinte estrutura 
    reduziu o array de transactions a seguinte estrura de dados
    objeto:  { income: "total de entradas", outcome: "total de saidas", total:  valor de entrada menso o valor de saidas}
    recebe no primeiro parametro uma função e no segundo a estrutura de dados inicial ou seja o ponto de partida 
    */

  // // o acc é o acumulator que nada mais é que {
  //   income: 0,
  //   outcome: 0,
  //   total: 0,
  // },

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transactions) => {
        if (transactions.type === 'income') {
          // se for = a income
          acc.income += transactions.price // pega todos os incomes mais o income que foi add no momento
          acc.total += transactions.price // aumenta o total existente usando o valor da transação
        } else {
          acc.outcome += transactions.price
          acc.total -= transactions.price // diminui o total existente usando o valor da transação
        }
        // assim cada interação do acc ele vai aumentando o income e o outcome

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
