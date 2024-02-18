import { ReactNode } from 'react';
import { theme } from '@constants/theme';
import { GlobalStyle } from '@root/GlobalStyles';
import { ThemeProvider } from 'styled-components';

interface IStylingWrapperProps {
  children: ReactNode;
}

export const StylingWrapper = ({ children }: IStylingWrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
