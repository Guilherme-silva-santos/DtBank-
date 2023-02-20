import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  // criase a interface com todos os linhas da tabela
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  created_at: string
}

interface createTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextTypes {
  transactions: Transaction[] // é igual a um array de transações
  fetchTransactions: (query?: string) => Promise<void> // devolve a function async sem retorno
  createTransactions: (data: createTransactionInput) => Promise<void>
}

interface TransactionsProvderProps {
  children: ReactNode // react node é qualquer elemento valido no react
}

export const TransactionsContext = createContext({} as TransactionsContextTypes)
// cria-se um contexto onde ele é igual a TransactionsContextTypes

export function TransactionProvider({ children }: TransactionsProvderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]) // inicia um estado com [] vazio
  // pois vai retornar muitas transações

  const fetchTransactions = useCallback(async (query?: string) => {
    // recebe uma query de busca
    // o async transformou a function em uma promessa
    // assim os awaitssão as resposat esperadas
    // await serve para um responde para algo que é esperado

    const response = await api.get('transactions', {
      params: {
        _sort: 'created_at',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data) // como esta sendo feita a att do array de transactions toda vez que é feita a busca
    // de transações o saldo vai mudar tambem
  }, [])
  // useCallback tem como função evitar com que alguma function seja recriada em memoria caso a mesma não
  // tenha sido alterada

  const createTransactions = useCallback(
    async (data: createTransactionInput) => {
      const { description, price, category, type } = data // pegou de dentro do data os campos

      const response = await api.post('transactions', {
        // o post para adicionar um novo registro dentro da lista
        description,
        price,
        category,
        type,
        created_at: new Date(),
      })

      setTransactions((state) => [response.data, ...state]) // pegou as transações anteriores e add a nova transacion
    },
    // dentro do array de dependencias esta a função para quando que o usecallback deve ser renderizado
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
