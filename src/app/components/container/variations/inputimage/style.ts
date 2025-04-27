import styled from "styled-components";

export const ImageInputLikeContainerStyled = styled.div<{ $text?: string }>`
  font-size: 18px;
  text-align: center;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
    position: relative;
    border: solid 2px #101010;
    border-radius: 8px;
    padding: ${(props) => (props.$text ? "0px 11px 0px 11px" : "18px")};
    background: #404040;

    display: flex;
    flex-direction: column;
  }
`;
