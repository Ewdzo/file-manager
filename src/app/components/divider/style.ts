import styled from "styled-components";

export const DividerStyled = styled.div`
  height: 1px;
  width: 100%;
  min-width: 1px;
  
  background: #404040;
  
  @media (min-width: 1024px) {
    min-height: 300px;
    height: auto;
    margin: 50px 0;
    max-width: 1px;
  }
`;
