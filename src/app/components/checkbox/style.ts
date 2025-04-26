import styled from "styled-components";

export const CheckboxStyled = styled.div`
  input {
    display: none;
  }

  input[type=checkbox] + label {
    display: block;
    height: 20px;
    width: 20px;
    border-radius: 2px;
    background: #404040;
  }

  input[type="checkbox"]:checked + label {
    background: url("/assets/icons/check.svg") #404040 no-repeat center;
    background-size: 12px;
  }
`;
