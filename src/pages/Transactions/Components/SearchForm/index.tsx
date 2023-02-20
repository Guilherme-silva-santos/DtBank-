import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContaine } from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../Contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string(), // dizendo que o unico campo do form e o query que foi oasado no register
})

type SearchFormInputs = z.infer<typeof searchFormSchema> // basicamente retorna qual é a tipagem dos campos do form
// ou seja falando que o tipo do search form é o que esta dentro do searchFormSchema

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting, // retorna se o formulario esta em estado de submit ou não
    },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  // como parametros da função passou data que searchForminputs que são os dados de dentro do input
  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContaine onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContaine>
  )
}
