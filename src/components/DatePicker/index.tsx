import { useState } from 'react';

import { ReactComponent as CalendarIcon } from '@assets/images/calendar.svg';
import { ReactComponent as ClearIcon } from '@assets/images/clear.svg';

import { DecoratedCalendar } from '@components/Calendar';
import { theme } from '@constants/theme';
import { GlobalStyle } from '@root/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import {
  CalendarButton,
  ClearButton,
  DateInput,
  InputWrapper,
  StyledDatePicker,
} from './styled';
import { IDateItem } from '@root/types/calendar';

import { convertDateItemToInputFormat } from '@root/utils/helpers';

interface IDatePickerProps {
  withHolidays: boolean;
}

export const DatePicker = ({ withHolidays }: IDatePickerProps) => {
  const [dateInputValue, setDateInputValue] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onCalendarIconClick = () => {
    setIsCalendarVisible((prevState) => !prevState);
  };

  const onDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInputValue(e.target.value);
  };

  const onClearButtonClick = () => {
    setDateInputValue('');
  };

  const changeDateInputValue = (dateItem: IDateItem) => {
    setDateInputValue(convertDateItemToInputFormat(dateItem));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledDatePicker>
        <InputWrapper>
          <CalendarButton $isCalendarVisible={isCalendarVisible}>
            <CalendarIcon onClick={onCalendarIconClick} />
          </CalendarButton>
          <DateInput
            type="text"
            value={dateInputValue}
            onChange={onDateInputChange}
            placeholder="Choose Date"
          />
          {dateInputValue && (
            <ClearButton onClick={onClearButtonClick}>
              <ClearIcon />
            </ClearButton>
          )}
        </InputWrapper>
        {isCalendarVisible && (
          <DecoratedCalendar
            dateInputValue={dateInputValue}
            withHolidays={withHolidays}
            changeDateInputValue={changeDateInputValue}
          />
        )}
      </StyledDatePicker>
    </ThemeProvider>
  );
};
