import { memo } from 'react';

import { ReactComponent as CalendarIcon } from '@assets/images/calendar.svg';
import { ReactComponent as ClearIcon } from '@assets/images/clear.svg';

import {
  CalendarButton,
  ClearButton,
  DateInput,
  InputWrapper,
  ValidationText,
} from './styled';

interface InputFieldProps {
  dateInputValue: string;
  errorText?: string;
  isCalendarVisible: boolean;
  onClearButtonClick: () => void;
  onDateInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalendarIconClick: () => void;
}

export const InputField = memo((props: InputFieldProps) => {
  const {
    isCalendarVisible,
    dateInputValue,
    errorText,
    onDateInputChange,
    onClearButtonClick,
    onCalendarIconClick,
  } = props;

  return (
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
      {errorText && <ValidationText>{errorText}</ValidationText>}
      {dateInputValue && (
        <ClearButton onClick={onClearButtonClick}>
          <ClearIcon />
        </ClearButton>
      )}
    </InputWrapper>
  );
});
