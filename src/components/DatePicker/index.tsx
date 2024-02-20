import { useMemo, useState } from 'react';

import { DecoratedCalendar } from '@components/Calendar';
import { InputField } from '@components/InputField';
import { StylingWrapper } from '@components/StylingWrapper';
import {
  IDateItem,
  LiteralStartDays,
  LiteralViewTypes,
} from '@root/types/calendar';
import { convertDateItemToInputFormat } from '@root/utils/helpers';
import { validateInputValue } from '@utils/helpers';

import { StyledDatePicker } from './styled';

interface IDatePickerProps {
  maxValue: IDateItem;
  minValue: IDateItem;
  withHolidays: boolean;
  viewType: LiteralViewTypes;
  startDay: LiteralStartDays;
}

export const DatePicker = (props: IDatePickerProps) => {
  const {
    withHolidays = false,
    viewType = 'year',
    startDay = 'monday',
    minValue = { year: 2024, month: 1, day: 1 },
    maxValue = { year: 2024, month: 1, day: 2 },
  } = props;

  const [dateInputValue, setDateInputValue] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onCalendarIconClick = () => {
    setIsCalendarVisible((prevState) => !prevState);
  };

  const onDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setDateInputValue(inputValue);
  };

  const onClearButtonClick = () => {
    setDateInputValue('');
  };

  const changeDateInputValue = (dateItem: IDateItem) => {
    setDateInputValue(convertDateItemToInputFormat(dateItem));
  };

  const inputValidationText = useMemo(() => {
    return (
      dateInputValue && validateInputValue(dateInputValue, minValue, maxValue)
    );
  }, [dateInputValue]);

  return (
    <StylingWrapper>
      <StyledDatePicker>
        <InputField
          errorText={inputValidationText}
          isCalendarVisible={isCalendarVisible}
          dateInputValue={dateInputValue}
          onCalendarIconClick={onCalendarIconClick}
          onDateInputChange={onDateInputChange}
          onClearButtonClick={onClearButtonClick}
        />
        {isCalendarVisible && (
          <DecoratedCalendar
            dateInputValue={dateInputValue}
            withHolidays={withHolidays}
            viewType={viewType}
            startDay={startDay}
            minValue={minValue}
            maxValue={maxValue}
            changeDateInputValue={changeDateInputValue}
          />
        )}
      </StyledDatePicker>
    </StylingWrapper>
  );
};
