import { createGlobalStyle, css } from 'styled-components';

interface IFlexMixin {
  align?: string;
  justify?: string;
  direction?: string;
  wrap?: string;
}

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    font-family: ${({ theme }) => theme.fontFamily.primary};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    background-color: inherit;
    cursor: pointer;
    border: none;
  }
`;

export const FlexMixin = ({
  align = 'stretch',
  justify = 'flex-start',
  direction = 'row',
  wrap = 'nowrap',
}: IFlexMixin = {}) => css`
  display: flex;
  align-items: ${align};
  justify-content: ${justify};
  flex-direction: ${direction};
  flex-wrap: ${wrap};
`;
