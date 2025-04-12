import styled from "styled-components";

export const DefaultMain = styled.main`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;

  position: relative;
  background: #202020;
  padding: 2em;

  display: flex;
  justify-content: center;
  align-items: center;

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
    background-position: top;
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
`;
