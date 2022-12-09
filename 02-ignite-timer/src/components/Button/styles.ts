import styled from "styled-components";
import { ButtonVariant } from '.'

interface ButtonContainerProps {
  variant: ButtonVariant;
}

// const buttonVariantsColors = {
//   primary: 'purple',
//   secondary: 'orange',
//   danger: 'red',
//   success: 'green',
// }

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white}
`;