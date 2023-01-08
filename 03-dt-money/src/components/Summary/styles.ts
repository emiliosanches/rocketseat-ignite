import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`;

interface SummaryCardProps {
  iconColor: keyof typeof defaultTheme;
  backgroundColor?: keyof typeof defaultTheme;
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme[props.backgroundColor || "gray-600"]};
  border-radius: 6p;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme["gray-300"]};

    svg {
      color: ${(props) => props.theme[props.iconColor]};
    }
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }
`;
