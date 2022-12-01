import styled from "styled-components";
import { ButtonVariant } from '.'

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariantsColors = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 400px;
  height: 100px;
  background: ${(props) => buttonVariantsColors[props.variant]};
`;