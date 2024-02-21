import { useState } from 'react';

import { DecoratedCalendar } from '@components/Calendar';
import { InputField } from '@components/InputField';
import { StylingWrapper } from '@components/StylingWrapper';
import {
  IDateItem,
  LiteralStartDays,
  LiteralViewTypes,
} from '@root/types/calendar';
import { convertDateItemToInputFormat } from '@root/utils/helpers';

import { StyledDatePicker } from './styled';

interface IDatePickerProps {
  maxValue: IDateItem;
  minValue: IDateItem;
  range: boolean;
  withHolidays: boolean;
  viewType: LiteralViewTypes;
  startDay: LiteralStartDays;
}

export const DatePicker = (props: IDatePickerProps) => {
  const {
    withHolidays = false,
    viewType = 'month',
    range = true,
    startDay = 'monday',
    minValue = { day: 1, month: 1, year: 2024},
    maxValue = { day: 5, month: 1, year: 2024},
  } = props;

  const [startDateInputValue, setStartDateInputValue] = useState('');
  const [endDateInputValue, setEndDateInputValue] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onCalendarIconClick = () => {
    setIsCalendarVisible((prevState) => !prevState);
  };

  const changeDateInputValue = (
    dateItem: IDateItem | null,
    type: string = 'start',
  ) => {
    const convertedValue = dateItem
      ? convertDateItemToInputFormat(dateItem)
      : '';

    if (type === 'start') {
      setStartDateInputValue(convertedValue);
    } else {
      setEndDateInputValue(convertedValue);
    }
  };

  return (
    <StylingWrapper>
      <StyledDatePicker>
        <InputField
          setInputValue={setStartDateInputValue}
          minValue={minValue}
          maxValue={maxValue}
          isCalendarVisible={isCalendarVisible}
          dateInputValue={startDateInputValue}
          onCalendarIconClick={onCalendarIconClick}
        />
        {range && (
          <InputField
            setInputValue={setEndDateInputValue}
            minValue={minValue}
            maxValue={maxValue}
            isCalendarVisible={isCalendarVisible}
            dateInputValue={endDateInputValue}
            onCalendarIconClick={onCalendarIconClick}
          />
        )}
        {isCalendarVisible && (
          <DecoratedCalendar
            startDateInputValue={startDateInputValue}
            endDateInputValue={endDateInputValue}
            withHolidays={withHolidays}
            viewType={viewType}
            startDay={startDay}
            minValue={minValue}
            maxValue={maxValue}
            changeDateInputValue={changeDateInputValue}
            range={range}
          />
        )}
      </StyledDatePicker>
    </StylingWrapper>
  );
};
