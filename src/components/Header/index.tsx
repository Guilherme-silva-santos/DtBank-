import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoimg from '../../Assets/Logo-Ignite.svg'
import { NewTransactionModal } from '../NewtransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoimg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            {/* como o trigger já é um botão o aschild faz com que ele aproveite o botão
                    ja existente no caso o que esta dentro de sua tag  */}
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
