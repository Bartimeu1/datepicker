import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DecoratedCalendar } from '@components/Calendar';
import { ConfigProvider } from '@components/ConfigProvider';
import { InputField } from '@components/InputField';
import { useOnClickOutside } from '@root/hooks';
import {
  CalendarStartDaysEnum,
  CalendarViewTypesEnum,
  DateInputType,
  DateInputTypesEnum,
  IDateItem,
} from '@root/types/calendar';
import { formatDateItemIntoInput, validateInputValue } from '@utils/formatting';

import { StyledDatePicker } from './styled';
import { IDatePickerProps } from './types';

export const DatePicker = (props: IDatePickerProps) => {
  const {
    onChange,
    onEndChange,
    holidays = false,
    todos = false,
    range = false,
    minValue,
    maxValue,
    viewType = CalendarViewTypesEnum.month,
    startDay = CalendarStartDaysEnum.monday,
  } = props;
  const pickerRef = useRef(null);

  const [startDateInputValue, setStartDateInputValue] = useState('');
  const [endDateInputValue, setEndDateInputValue] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const onCalendarIconClick = useCallback(() => {
    setIsCalendarVisible((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(
        !validateInputValue(startDateInputValue) ? startDateInputValue : '',
      );
    }
  }, [startDateInputValue, onChange]);

  useEffect(() => {
    if (onEndChange) {
      onEndChange(
        !validateInputValue(endDateInputValue) ? endDateInputValue : '',
      );
    }
  }, [endDateInputValue, onEndChange]);

  const changeDateInputValue = (
    dateItem: IDateItem | null,
    type: DateInputType = DateInputTypesEnum.start,
  ) => {
    const dateInputValue = dateItem ? formatDateItemIntoInput(dateItem) : '';

    if (type === DateInputTypesEnum.start) {
      setStartDateInputValue(dateInputValue);
      onChange && onChange(dateInputValue);
    } else {
      setEndDateInputValue(dateInputValue);
      onEndChange && onEndChange(dateInputValue);
    }
  };

  const inputFieldProps = {
    minValue: minValue,
    maxValue: maxValue,
    isCalendarVisible: isCalendarVisible,
    onCalendarIconClick: onCalendarIconClick,
  };

  const closeCalendar = () => {
    setIsCalendarVisible(false);
  };

  useOnClickOutside(pickerRef, (e: MouseEvent | TouchEvent) => {
    if (e.target instanceof HTMLElement) {
      if (!e.target.closest('[data-modal]')) {
        closeCalendar();
      }
    }
  });

  const startInputLabel = useMemo(() => (range ? 'From' : 'Date'), [range]);

  return (
    <ConfigProvider>
      <StyledDatePicker ref={pickerRef}>
        <InputField
          onChange={onChange}
          label={startInputLabel}
          setInputValue={setStartDateInputValue}
          dateInputValue={startDateInputValue}
          {...inputFieldProps}
        />
        {range && (
          <InputField
            onChange={onEndChange}
            label={'To'}
            setInputValue={setEndDateInputValue}
            dateInputValue={endDateInputValue}
            {...inputFieldProps}
          />
        )}
        {isCalendarVisible && (
          <DecoratedCalendar
            startDateInputValue={startDateInputValue}
            endDateInputValue={endDateInputValue}
            changeDateInputValue={changeDateInputValue}
            holidays={holidays}
            todos={todos}
            range={range}
            viewType={viewType}
            startDay={startDay}
            minValue={minValue}
            maxValue={maxValue}
          />
        )}
      </StyledDatePicker>
    </ConfigProvider>
  );
};
