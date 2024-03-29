import { ITheme } from '@root/types/theme';

export const theme: ITheme = {
  color: {
    white: '#fff',
    black: '#000',
    primary: '#333333',
    selected: '#2F80ED',
    holiday: '#FF0000',
    disabled: '#AAAAAA',
    placeholder: '#BBBBBB',
    border: '#E1E1E1',
    textHover: '#F1F1F1',
    error: '#ff0000',
    range: '#2F80ED96',
    insideRange: '#2F80ED19',
  },
  fontFamily: {
    primary: 'Open Sans, sans-serif',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 13,
    lg: 14,
    xl: 15,
  },
  borderRadius: {
    sm: 6,
    md: 8,
  },
  calendarWidth: {
    sm: 230,
    md: 520,
    lg: 780,
  },
  breakpoints: {
    tablet: 870,
    mobile: 570,
  },
};
