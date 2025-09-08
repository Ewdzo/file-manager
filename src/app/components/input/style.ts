import styled from "styled-components";

export const InputStyled = styled.div`
  font-size: 18px;
  text-align: center;
  width: 100%;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    height: 38px;
    padding: 8px;
    color: #fff;

    text-align: center;

    background: #404040;
    border: solid 1px #101010;
    border-radius: 8px;
  }
`;

export const TextAreaStyled = styled.div`
  font-size: 18px;
  text-align: center;
  width: 100%;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  textarea {
    width: 100%;
    height: 38px;
    padding: 8px;
    color: #fff;
    field-sizing: content;

    text-align: center;

    background: #404040;
    border: solid 1px #101010;
    border-radius: 8px;
  }
`;
