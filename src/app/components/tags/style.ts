import styled from "styled-components";

export const TagStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

export const TagBar = styled.div`
  display: flex;
  flex-direction: column;
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

  @media (min-width: 1024px) {
    width: fit-content;
    flex-grow: 1;

    align-items: start;

    h1 {
      font-size: 32px;
    }

    input[type="text"] {
      max-width: 80%;

      height: 60px;
      padding: 8px;
      padding-left: 60px;

      font-size: 24px;

      background: url(/assets/icons/Tag.svg) #404040 no-repeat;
      background-size: 24px;
      background-position-y: center;
      background-position-x: 20px;
    }
  }
`;

export const TagContainer = styled.div`
  width: 100%;

  padding: 1em 0.5em;

  display: flex;
  align-items: start;

  flex-direction: column;
  gap: 1em;

  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-image: url("/assets/images/server_background.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: bottom;
    background-size: cover;
    max-height: 615px;
    box-shadow: inset 0 0 0 1000px #000000cc;
    mask-image: linear-gradient(
      0deg,
      #00000000,
      #00000080 10%,
      rgb(0, 0, 0) 100%
    );
  }

  @media (min-width: 1024px) {
    min-height: 550px;

    flex-direction: row;
    padding: 4em 2em 1em 2em;
  }
`;

export const AdvancedFiltering = styled.div`
  flex-wrap: wrap;
  align-items: start;
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

    background: url(/assets/icons/Tag.svg) #404040 no-repeat;
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

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: start;

    padding: 1em 2em;
    height: fit-content;
    width: 50%;
  }
`;

export const FileSection = styled.section`
  width: 100%;
  flex-direction: column;
  gap: 1em;
  padding: 1em 0;

  align-items: center;
  justify-content: center;

  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    gap: 1em;
    max-width: 650px;
  }

  @media (min-width: 1024px) {
    align-items: start;
    width: 100%;

    padding: 1em 2em;

    div {
      justify-content: start;
      max-width: none;
    }
  }
`;
