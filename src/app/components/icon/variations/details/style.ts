import styled from "styled-components";

export const DetailsIconStyled = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  gap: 2em;

  @media (min-width: 1024px) {
    width: 100%;
    height: 100%;

    padding: 0 2em;
    align-items: start;
  }
`;
