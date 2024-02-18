import { createGlobalStyle } from 'styled-components';

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
