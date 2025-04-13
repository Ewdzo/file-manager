import styled from "styled-components";

export const ArticleStyled = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 225px;

  @media (min-width: 1024px) {
    width: 350px;
  };

  gap: 1em;
  padding: 1em 0;
`;
