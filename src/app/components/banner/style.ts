import styled from "styled-components";

export const BannerStyled = styled.div<{ $image: string }>`
  min-height: 600px;
  position: relative;
  color: #fdfdfd;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: url(${(props) => props.$image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    max-height: 615px;
    box-shadow: inset 0 0 0 1000px #00000050;
    mask-image: linear-gradient(
      0deg,
      #00000000,
      #00000080 10%,
      rgb(0, 0, 0) 100%
    );
  }

  @media (min-width: 1024px) {
    justify-content: end;
    padding: 3em 0;
  }
`;
