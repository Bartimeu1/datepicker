import React, { useMemo, memo } from 'react';

import { ReactComponent as CalendarIcon } from '@assets/images/calendar.svg';
import { ReactComponent as ClearIcon } from '@assets/images/clear.svg';
import { IDateItem } from '@root/types/calendar';
import { validateInputValue } from '@utils/input';

import {
  CalendarButton,
  ClearButton,
  DateInput,
  InputWrapper,
  ValidationText,
} from './styled';

interface InputFieldProps {
  minValue: IDateItem;
  maxValue: IDateItem;
  dateInputValue: string;
  isCalendarVisible: boolean;
  onCalendarIconClick: () => void;
  setInputValue: (value: string) => void;
}

export const InputField = memo(function InputField(props: InputFieldProps) {
  const {
    isCalendarVisible,
    dateInputValue,
    onCalendarIconClick,
    minValue,
    maxValue,
    setInputValue,
  } = props;

  const inputValidationText = useMemo(() => {
    return (
      dateInputValue && validateInputValue(dateInputValue, minValue, maxValue)
    );
  }, [dateInputValue, minValue, maxValue]);

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClearButtonClick = () => {
    setInputValue('');
  };

  return (
    <InputWrapper>
      <CalendarButton $isCalendarVisible={isCalendarVisible}>
        <CalendarIcon onClick={onCalendarIconClick} />
      </CalendarButton>
      <DateInput
        type="text"
        value={dateInputValue}
        onChange={onInputValueChange}
        placeholder="Choose Date"
      />
      {inputValidationText && (
        <ValidationText>{inputValidationText}</ValidationText>
      )}
      {dateInputValue && (
        <ClearButton onClick={onClearButtonClick}>
          <ClearIcon />
        </ClearButton>
      )}
    </InputWrapper>
  );
});
