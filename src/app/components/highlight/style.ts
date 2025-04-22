import styled from "styled-components";

export const HighlightStyled = styled.div`
  width: 100%;
  padding: 1em 0.5em;
  gap: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;

    align-items: center;
    justify-content: center;

    #movie-container {
      display: flex;
      justify-content: center;
      gap: 1em;
      flex-wrap: wrap;
    }
  }

  #search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: 100%;

    input[type="checkbox"] {
      display: none;
    }

    label:hover {
      cursor: pointer;
    }

    input[type="text"] {
      width: 100%;
      height: 38px;
      padding: 8px;
      padding-left: 35px;

      border-radius: 8px;
      max-width: 400px;

      background: url(/assets/icons/search.svg) #404040 no-repeat;
      background-size: 16px;
      background-position-y: center;
      background-position-x: 10px;
    }
  }

  @media (min-width: 1024px) {
    padding: 1em;
    
    #search-bar {
      justify-content: end;
    }

    section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1em;

      align-items: start;

      #movie-container {
        display: flex;
        justify-content: start;
      }
    }
  }
`;
