import styled from "styled-components";

export const InputStyled = styled.div`
  font-size: 16px;
  text-align: center;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;

  input {
    width: 100%;
    height: 38px;
    padding: 8px;

    text-align: center;

    background: #404040;
    border: solid 1px #101010;
    border-radius: 8px;
  }

  #image-input {
    border: solid 2px #101010;
    border-radius: 8px;
    padding: 16px;
    background: #404040;
  }
`;
