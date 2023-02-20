import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { TransactionsContext } from '../../Contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInput = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      // usecontextselector para ficar monitorando o elemento e dizer quando ele podera ser renderizado novamente
      return context.createTransactions
    },
  )

  const {
    control, // sempre que for preciso incluir uma informação no formulario e essa info não vem de um
    // input ou qualquer elemento nativo do html usa-se o control
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInput) {
    const { description, price, category, type } = data // pegou de dentro do data os campos

    await createTransactions({
      description,
      price,
      category,
      type,
    })

    reset()
  }

  return (
    <Dialog.Portal>
      {/* o portal pode fazer com que um conteudo dentro dele 
                            apareca em outro local da aplicação, neste caso como o 
                            botão esta no header e o conteudo do modal precisa aparecer em um container 
                            no meio da tela e não no header em si usamos o portal
                        */}
      <Overlay />{' '}
      {/* O fundo mais escuro da aplicação, dialog overlay foi criado direto no styles */}
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={22} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {
              ...register('price', { valueAsNumber: true }) // converte esse input para numero
            }
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type" // qual o nome do campo a ser monitorado
            render={({ field }) => {
              // desestrutura as props do controller e pega somente field
              // function que retorna o html qual o conteudo relacionado ao type
              // acessando as props dos controller vemos varias props como onchange
              console.log(field) // para ver as props do controller

              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {/* quando o valor do campo type mudar vai chamar a função de onchange do field */}
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp size={22} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={22} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
