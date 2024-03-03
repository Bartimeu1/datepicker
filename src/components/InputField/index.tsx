import React, { memo, useMemo } from 'react';

import { CalendarIcon, ClearIcon } from '@constants/icons';
import { applyDateMask, validateInputValue } from '@root/utils/formatting';

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
    onChange,
  } = props;

  const inputValidationText = useMemo(() => {
    return (
      dateInputValue && validateInputValue(dateInputValue, minValue, maxValue)
    );
  }, [dateInputValue, minValue, maxValue]);

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = applyDateMask(e.target.value);

    setInputValue(inputValue);
  };

  const onClearButtonClick = () => {
    setInputValue('');
    onChange && onChange('');
  };

  return (
    <InputWrapper>
      <FieldTitle>{label}</FieldTitle>
      <InputContent>
        <CalendarButton
          onClick={onCalendarIconClick}
          data-testid="open-calendar-button"
          $isCalendarVisible={isCalendarVisible}>
          <CalendarIcon />
        </CalendarButton>
        <DateInput
          data-testid="date-input"
          type="text"
          value={dateInputValue}
          onChange={onInputValueChange}
          placeholder="Choose Date"
        />
        {inputValidationText && (
          <ValidationText data-testid="validation-text">
            {inputValidationText}
          </ValidationText>
        )}
        {dateInputValue && (
          <ClearButton
            onClick={onClearButtonClick}
            data-testid="clear-input-button">
            <ClearIcon />
          </ClearButton>
        )}
      </InputContent>
    </InputWrapper>
  );
});
