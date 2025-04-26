import styled from "styled-components";

export const SearchStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2em;

  #search-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    padding: 0 1em;
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
    #search-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
      width: 100%;

      h1 {
        font-size: 32px;
      }

      input[type="text"] {
        width: 100%;
        height: 60px;
        padding: 8px;
        padding-left: 60px;

        font-size: 24px;

        border-radius: 8px;
        max-width: 400px;

        background: url(/assets/icons/search.svg) #404040 no-repeat;
        background-size: 24px;
        background-position-y: center;
        background-position-x: 20px;
      }
    }
  }

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

  #advanced-filtering {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: 100%;

    h1 {
      font-size: 32px;
    }

    input[type="text"] {
      width: 100%;
      height: 30px;
      padding: 8px;
      padding-left: 30px;

      font-size: 16px;

      border-radius: 8px;
      max-width: 400px;

      background: url(/assets/icons/search.svg) #404040 no-repeat;
      background-size: 12px;
      background-position-y: center;
      background-position-x: 10px;
    }

    #tag-filter {
      display: flex;
      flex-direction: column;
      align-items: center;

      background-color: #1e1e1e;
      border: #101010 solid 2px;
      border-radius: 8px;

      padding: 1em;
      gap: 1em;
    }
  }

  @media (min-width: 1024px) {
    padding: 1em;
  }
`;
