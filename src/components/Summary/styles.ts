import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); //3 colunas dentro do grid e todas com o mesmo tamanho
  gap: 2rem;

  margin-top: -5rem; // para que o summary seja "jogado" para cima do header
`

interface SummaryCardProps {
  variant?: 'green' // caso SummaryCard tiver uma variante ela sera green
}

export const SummaryCard = styled.div<SummaryCardProps>`
  // <SummaryCardProps> as props que SummaryCard pode receber
  background-color: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block; // strong por padrão display inline
    margin: 1rem;
    font-size: 2rem;
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      // caso na tag html div seja passado uma variant green && = add css
      background-color: ${(props) => props.theme['green-700']};
    `}
`
