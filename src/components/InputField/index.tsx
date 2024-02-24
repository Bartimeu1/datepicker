import React, { memo, useMemo } from 'react';

import { ReactComponent as CalendarIcon } from '@assets/images/calendar.svg';
import { ReactComponent as ClearIcon } from '@assets/images/clear.svg';
import { validateInputValue } from '@root/utils/formatting';

import {
  CalendarButton,
  ClearButton,
  DateInput,
  FieldTitle,
  InputContent,
  InputWrapper,
  ValidationText,
} from './styled';
import { IInputFieldProps } from './types';

export const InputField = memo(function InputField(props: IInputFieldProps) {
  const {
    isCalendarVisible,
    dateInputValue,
    onCalendarIconClick,
    minValue,
    maxValue,
    setInputValue,
    label,
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
      <FieldTitle>{label}</FieldTitle>
      <InputContent>
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
      </InputContent>
    </InputWrapper>
  );
});
