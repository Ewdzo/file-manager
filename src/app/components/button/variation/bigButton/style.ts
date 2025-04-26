import styled from "styled-components";

export const BigButtonStyled = styled.button`
  background: #404040;
  
  font-size: 18px;
  color: #888888;

  border-radius: 8px;
  padding: 0.4em;
  min-width: 150px;


  display: flex;
  justify-content: space-evenly;
  align-items: center;

  gap: 0.5em;

  img {
    width: 15px;
    height: 15px;
  }

  @media (min-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    min-width: fit-content;

    gap: 0.75em;
    padding: 0.8em;

    img {
      width: auto;
      height: auto;
    }
  }
`;