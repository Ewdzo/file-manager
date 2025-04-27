import styled from "styled-components";

export const DividerStyled = styled.div`
  height: 1px;
  width: 80%;
  margin: 0 auto;
  min-width: 1px;
  
  background: #404040;
  
  @media (min-width: 1024px) {
    height: auto;
    width: 100%;
    margin: 50px 0;
    max-width: 1px;
  }
`;
