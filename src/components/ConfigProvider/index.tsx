import { ErrorBoundary } from '@components/ErrorBoundary';
import { theme } from '@constants/theme';
import { GlobalStyle } from '@root/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import { IConfigProviderProps } from './types';
export const ConfigProvider = ({ children }: IConfigProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>{children}</ErrorBoundary>
    </ThemeProvider>
  );
};
