// src/components/Input/styles.ts
import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) => props.hasError && css`
    border-color: #c53030;
  `}

  ${(props) => props.isFocused && css`
    color: #ff9000;
    border-color: #ff9000;
  `}

  ${(props) => props.isFilled && css`
    color: #ff9000;
  `}



  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #F4EDE8;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
      box-shadow: 0 0 0 30px #232129 inset !important;
      -webkit-box-shadow: 0 0 0 30px #232129 inset !important;
      -webkit-text-fill-color: #F4EDE8 !important;
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0 0 0 16px;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
