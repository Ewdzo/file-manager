import styled from "styled-components";

export const InputStyled = styled.div`
  font-size: 18px;
  text-align: center;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #image-input {
    border: solid 2px #101010;
    border-radius: 8px;
    padding: 12px;
    background: #404040;

    div {
      border: solid 2px #101010;
      border-radius: 8px;
      background: white;
      padding: 0;
      margin: 0;

      img {
        width: 69px;
        height: 69px;
        object-fit: cover;
        border-radius: 6px;
      }
    }
  }
`;
