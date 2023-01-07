import logo from '../../assets/logo.svg'

import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}