import styled from "styled-components";

export const ArticleStyled = styled.article`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2em;

  max-width: 800px;
  padding: 1em;

  @media (min-width: 1024px) {
    align-items: normal;
    flex-direction: row;
  }
`;
