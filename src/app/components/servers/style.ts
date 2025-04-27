import styled from "styled-components";

export const ServerStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

export const ServerBar = styled.div`
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

      background: url(/assets/icons/Server.svg) #404040 no-repeat;
      background-size: 24px;
      background-position-y: center;
      background-position-x: 20px;
    }
  }
`;

export const ServerContainer = styled.div`
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
