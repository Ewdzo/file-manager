import styled from "styled-components";

export const ArticleStyled = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1em;
  padding: 1em 0;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: start;
  }
`;
