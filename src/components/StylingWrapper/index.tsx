import { theme } from '@constants/theme';
import { GlobalStyle } from '@root/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import { IStylingWrapperProps } from './types';

export const StylingWrapper = ({ children }: IStylingWrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
