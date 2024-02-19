import { useState } from 'react';

import { ReactComponent as CalendarIcon } from '@assets/images/calendar.svg';
import { ReactComponent as ClearIcon } from '@assets/images/clear.svg';
import { DecoratedCalendar } from '@components/Calendar';
import { StylingWrapper } from '@components/StylingWrapper';
import {
  IDateItem,
  LiteralStartDays,
  LiteralViewTypes,
} from '@root/types/calendar';
import { convertDateItemToInputFormat } from '@root/utils/helpers';

import {
  CalendarButton,
  ClearButton,
  DateInput,
  InputWrapper,
  StyledDatePicker,
} from './styled';

interface IDatePickerProps {
  withHolidays: boolean;
  viewType: LiteralViewTypes;
  startDay: LiteralStartDays;
}

export const DatePicker = ({
  withHolidays = false,
  viewType = 'month',
  startDay = 'monday',
}: IDatePickerProps) => {
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
    <StylingWrapper>
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
            viewType={viewType}
            startDay={startDay}
            changeDateInputValue={changeDateInputValue}
          />
        )}
      </StyledDatePicker>
    </StylingWrapper>
  );
};
